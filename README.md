# rdf4j-result-converter
A little utility class that helps you to transform the table-like results that you get from an rdf4j REST API into a nested JSON tree

## The Problem
When you query RDF4J-Databases via their REST API, you get somewhat ugly results. The REST-API returns a direct representation of the result-table in JSON. This is not very useful when you want to use your query-results in a frontend to dynamically display your data. Let's look at an example:

![Example Graph](https://github.com/aljoshakoecher/rdf4j-result-converter/raw/documentation/images/docu-images/example-graph.png)

There are three pet owners with varying numbers of pets. While Peter has only one pet, mary has three. If we'd like to find all pet owners, their pets and the type of pet(s) they have, we migh send the following query against our RDF4J database:
```SPARQL
PREFIX ex: <http://example.com#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?owner ?pet ?petType where {
  ?owner rdf:type ex:PetOwner;
    ex:hasPet ?pet.
  ?pet ex:petType ?petType.
}
```
