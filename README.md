![npm](https://img.shields.io/npm/v/sparql-result-converter)
![GitHub](https://img.shields.io/github/license/aljoshakoecher/sparql-result-converter)

# sparql-result-converter
A little utility class that helps you to transform the table-like results that you get from a SPARQL query into a nested JSON tree with a user-defined structure.

## How to use it
Just install as a dependecy via `npm install sparql-result-converter`.
In your code you can then use the converter like this:
```javascript
// Require the converter
const SparqlResultConverter = require('sparql-result-converter');
const converter = new SparqlResultConverter();

// convert a SPARQL result
const convertedResult = converter.convert(inputArray, mappingDefinitions);
```
You have to pass two parameters to `convert()`:
1) `inputArray` are the results you get from your SPARQL query
2) `mappingDefinitions` is a recursive structure that describes how your converted result should look like. It looks like this:
       
   ```javascript
    const convertStructure: MappingDefinition = [
      {
		rootName: 'name of the property that this group will be subordinated under'
		propertyToGroup: 'a variable in your SPARQL query that you want to group on',			 
        name: 'this can be used to rename the variable',
        childMappings: [{
			// This is a Partial<MappingDefinition>. 
			// --> You can define a complete MappingDefinition in case you want to create a nested structure
			// --> You can also just set "rootName" if you don't want to group any further but want have the ungrouped "rest" under a defined rootName
		}]
      }
	];
    ```
	
      `propertyToGroup`: The element in your query-result that you want to group (corresponds to a variable in the SELECT part of your query)</br>
      `name`: Can be used for mapping the result object name to a new name.</br>
	  `rootName`: The key of the grouped element in the superordinate array. After grouping, the grouped structure will be added as an array with key 'rootName' in the parent element.</br>

## A more detailed description
When you query Triple stores with their REST API, you get a tabular structure which can be somewhat ugly if the result actually is a nested tree-like structure. The REST-API returns a direct representation of the result-table in JSON. This is not very useful when you want to use your query-results e.g. in a frontend to dynamically display your data. Let's look at an example:

![Example Graph](https://github.com/aljoshakoecher/sparql-result-converter/raw/documentation/images/docu-images/example-graph.png)

There are three pet owners with varying numbers of pets. While Peter has only one pet, mary has three. If we'd like to find all pet owners, their pets and the type of pet(s) they have, we might send the following query against our triple store:
```SPARQL
PREFIX ex: <http://example.com#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?owner ?pet ?petType where {
  ?owner rdf:type ex:PetOwner;
    ex:hasPet ?pet.
  ?pet ex:petType ?petType.
}
```

For your example, the return of this query could look like this:

?owner | ?petName | ?petType 
------ | -------- | --------
ex:Peter | ex:Rex | ex:Dog
ex:Mary | ex:Huey | ex:Cat
ex:Mary | ex:Dewey | ex:Cat
ex:Mary | ex:Louie | ex:Cat
ex:John | ex:Lassie | ex:Dog
ex:John | ex:Oliver | :ex:Bird


The returned JSON just represents this table, the JSON looks like this:
```JSON
{
  "head": {
    "vars": [
      "owner",
      "pet",
      "petType"
    ]
  },
  "results": {
    "bindings": [
      {
        "owner": {
          "type": "uri",
          "value": "http://example.com#Peter"
        },
        "petType": {
          "type": "uri",
          "value": "http://example.com#Dog"
        },
        "petName": {
          "type": "uri",
          "value": "http://example.com#Rex"
        }
      },
      {
        "owner": {
          "type": "uri",
          "value": "http://example.com#Mary"
        },
        "petType": {
          "type": "uri",
          "value": "http://example.com#Cat"
        },
        "petName": {
          "type": "uri",
          "value": "http://example.com#Huey"
        }
      },
      {
        "owner": {
          "type": "uri",
          "value": "http://example.com#Mary"
        },
        "petType": {
          "type": "uri",
          "value": "http://example.com#Cat"
        },
        "petName": {
          "type": "uri",
          "value": "http://example.com#Dewey"
        }
      },
      {
        "owner": {
          "type": "uri",
          "value": "http://example.com#Mary"
        },
        "petType": {
          "type": "uri",
          "value": "http://example.com#Cat"
        },
        "petName": {
          "type": "uri",
          "value": "http://example.com#Louie"
        }
      },
      {
        "owner": {
          "type": "uri",
          "value": "http://example.com#John"
        },
        "petType": {
          "type": "uri",
          "value": "http://example.com#Dog"
        },
        "petName": {
          "type": "uri",
          "value": "http://example.com#Lassie"
        }
      },
      {
        "owner": {
          "type": "uri",
          "value": "http://example.com#John"
        },
        "petType": {
          "type": "uri",
          "value": "http://example.com#Bird"
        },
        "petName": {
          "type": "uri",
          "value": "http://example.com#Oliver"
        }
      }
    ]
  }
}
```

The result is an array consisting of objects for each row of the table. Now if you want to show all owners and all pets of each owner, a nested structure is better suited. **Converting from the tabular to a nested structure is exactly what sparql-result-converter does**. It converts the flat array into a nested structure by grouping on certain properties. You can decide which properties should be grouped by passing an array representing your desired structure to the converter function. </br>
In a first step of this example, we could want to group on the owners and would therefore pass the mapping definition:
 ```javascript
const mappingDefinition: MappingDefinition[] = [
	{
		rootName: 'owners',
		propertyToGroup: 'owner',
		name: 'name',
		childMappings: [{
			rootName: 'pets',
		}]
	}
];
```
As a result, we want an object with key 'owners', therefore `rootName` = owners. Furthermore, we want to group on ?owner (see SPARQL query), therefore we set `propertyToGroup` to be 'owner'. As the key for the grouped array is "owners", we might want to change the owner-property to be 'name'. This is done by setting `name` to 'name'. In this first example, we don't want to group any further, but we want to make sure that the rest (i.e. the pets) is subordinated under the key 'pets', that's why we set `rootName` of the only childMapping to 'pets'.

The converted result will look like this:
```javascript
{
	owners: [
		{
			name: 'Peter',
			pets: [
				{
					petName: 'Rex',
					petType: 'Dog'
				}
			]
		},
		{
			name: 'John',
			pets: [
				{
					petName: 'Lassie',
					petType: 'Dog'
				},
				{
					petName: 'Oliver',
					petType: 'Cat'
				}
			]
		},
		{
			name: 'Mary',
			pets: [
				{
					petName: 'Huey',
					petType: 'Cat'
				},
				{
					petName: 'Dewey',
					petType: 'Cat'
				},
				{
					petName: 'Louie',
					petType: 'Cat'
				}
			]
		}
	]
};
```


Now let's say we that we want to group on the owners and on the petType afterwards. This can be achieved by a nested mapping definition. Look at the following mapping definition:

```javascript
const twoLayerMappingDefinition: MappingDefinition[] = [
	{
		rootName: 'owners',
		propertyToGroup: 'owner',
		name: 'name',
		childMappings: [
			{
				rootName: 'petTypes',
				propertyToGroup: 'petType',
				name: 'type',
				childMappings: [{
					rootName: 'pets'
				}]
			}
		]
	},
];
```
This nested mapping definition will lead to the following result:
```javascript
 {
	owners: [
		{
			name: 'Peter',
			petTypes: [
				{
					type: 'Dog',
					pets: [
						{ petName: 'Rex' }
					]
				}
			]
		},
		{
			name: 'John',
			petTypes: [
				{
					type: 'Dog',
					pets: [
						{ petName: 'Lassie' }
					]
				},
				{
					type: 'Cat',
					pets: [
						{ petName: 'Oliver' }
					]
				}
			]
		},
		{
			name: 'Mary',
			petTypes: [
				{
					type: 'Cat',
					pets: [
						{ petName: 'Huey' },
						{ petName: 'Dewey' },
						{ petName: 'Louie' },
					]
				}
			]
		}
	]
};
```
