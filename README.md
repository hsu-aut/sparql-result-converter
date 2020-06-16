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
2) `mappingDefinitions` is an array that describes how your converted result should look like. It consists of mapping definitions looking like this:
       
   ```javascript
    const convertStructure = [
      {
        objectToGroup: 'yourObjectToGroup',
        name: 'newPropertyName',
        childRoot: 'nameOfTheSubordinateArray'
      }
    ];
    ```
      `objectToGroup`: The element in your query-result that you want to group (corresponds to a variable in the SELECT part of your query)</br>
      `name`: Can be used for mapping the result object name to a new name.</br>
      `childRoot`: The name of the root element of the subordinate array. After grouping your `objectToGroup`, the child elements will be added as an array. This array will be given the property name `childRoot`.</br>

## A more detailed description
When you query Triple stores with their REST API, you get a tabular structure which can be somewhat ugly if the result actually is a nested tree-like structure. The REST-API returns a direct representation of the result-table in JSON. This is not very useful when you want to use your query-results in a frontend to dynamically display your data. Let's look at an example:

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

The result is an array consisting of objects for each row of the table. Now if you want to show all owners and all pets of each owner,  a nested structure is better suited. This is what sparql-result-converter gives you. It converts the flat array into a nested structure by grouping on certain properties. You can decide which properties should be grouped by passing an array representing your desired structure to the converter function. </br>
In this example, we want to group on the owners and would therefore pass the following array:
 ```javascript
const convertStructure = [
  {
    objectToGroup: 'owner',           // property that should be grouped
    name: 'ownerName',                // new name for the grouped property
    childRoot: 'pets'                 // name of the array that will contain the remaining properties (petName and petType)
  }
];
```
The converted array will look like this:
```javascript
const expectedResult = [
  {
    ownerName: 'Peter',
    pets: [
      {
        petName: 'Rex',
        petType: 'Dog'
      }
    ]
  },
  {
    ownerName: 'John',
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
    ownerName: 'Mary',
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
];
```

You can use the `name` to map the `objectToGroup` to a new property name.The converter only takes the value and gets rid of the type, therefore you might want to change the property name.

You can add more objects to `convertStructure` in case you want to successively group on more properties (In this example, you could also group on 'petType').
