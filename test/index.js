
import JsonTable2Tree from "../src/json_table2tree";

t2tConverter = new JsonTable2Tree();

result = t2tConverter.convertTableToTree(testData.results, testData)

console.log(result);




// This is the table-structure we might get from a DB
testData = {
    "head":     
    ["personName", "petName", "petType"],
    "results": [
        ["Alex", "Rex", "Dog"],
        ["John", "Lassie", "Cat"],
        ["John", "Oliver", "Dog"],
        ["Mary", "Huey", "Cat"],
        ["Mary", "Dewey", "Cat"],
        ["Mary", "Louie", "Cat"],
    ]
}

resultObject = [
    {
        object: 'personName',
        name: 'name',
        childRoot: 'petName'
    },
]