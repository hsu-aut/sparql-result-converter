/**
 * Mock-up of a piece of data that could be returned from a DB-Query
 */
export const twoLayerTestData = {
	head: ['owner', 'dogName', 'catName'],
	results: [
		{
			"owner": {
				"type": "uri",
				"value": "Peter"
			},
			"dogName": {
				"type": "uri",
				"value": "Rex"
			}
		},
		{
			"owner": {
				"type": "uri",
				"value": "John"
			},
			"catName": {
				"type": "uri",
				"value": "Jimmy"
			},
			"dogName": {
				"type": "uri",
				"value": "Lassie"
			}
		},
		{
			"owner": {
				"type": "uri",
				"value": "John"
			},
			"catName": {
				"type": "uri",
				"value": "Jimmy"
			},
			"dogName": {
				"type": "uri",
				"value": "Oliver"
			}
		},
		{
			"owner": {
				"type": "uri",
				"value": "Mary"
			},
			"catName": {
				"type": "uri",
				"value": "Huey"
			},
			"dogName": {
				"type": "uri",
				"value": "Louie"
			}
		},
		{
			"owner": {
				"type": "uri",
				"value": "Mary"
			},
			"catName": {
				"type": "uri",
				"value": "Dewey"
			},
			"dogName": {
				"type": "uri",
				"value": "Louie"
			}
		}
	]
};


export const oneLayerTestData = {
	head: ['maleOwner', 'femaleOwner', 'dogName', 'catName'],
	results: [
		{
			"maleOwner": {
				"type": "uri",
				"value": "Peter"
			},
			"dogName": {
				"type": "uri",
				"value": "Rex"
			}
		},
		{
			"maleOwner": {
				"type": "uri",
				"value": "John"
			},
			"catName": {
				"type": "uri",
				"value": "Jimmy"
			},
			"dogName": {
				"type": "uri",
				"value": "Lassie"
			}
		},
		{
			"maleOwner": {
				"type": "uri",
				"value": "John"
			},
			"catName": {
				"type": "uri",
				"value": "Jimmy"
			},
			"dogName": {
				"type": "uri",
				"value": "Oliver"
			}
		},
		{
			"femaleOwner": {
				"type": "uri",
				"value": "Mary"
			},
			"catName": {
				"type": "uri",
				"value": "Huey"
			},
			"dogName": {
				"type": "uri",
				"value": "Louie"
			}
		},
		{
			"femaleOwner": {
				"type": "uri",
				"value": "Mary"
			},
			"catName": {
				"type": "uri",
				"value": "Dewey"
			},
			"dogName": {
				"type": "uri",
				"value": "Louie"
			}
		}
	]
};
