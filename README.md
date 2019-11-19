# rdf4j-result-converter
A little utility class that helps you to transform the table-like results that you get from an rdf4j REST API into a nested JSON tree

## The Problem
When you query RDF4J-Databases via their REST API, you get somewhat ugly results. The REST-API returns a direct representation of the result-table in JSON. This is not very useful when you want to use your query-results in a frontend to dynamically display your data. Let's look at an example:

There are three pet owners with varying numbers of pets
![Example Graph](https://github.com/aljoshakoecher/rdf4j-result-converter/tree/documentation/images/docu-images/example-graph.png)
