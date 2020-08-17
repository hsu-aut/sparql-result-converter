// Expected result for one layer mapping:
export const expectedResult = [
	{
		ownerName: 'Peter',
		dogs: [
			{
				petName: 'Rex',
			}
		]
	},
	{
		ownerName: 'John',
		dogs: [
			{
				petName: 'Lassie',
			},
			{
				petName: 'Oliver',
			}
		],
		cats: [
			{
				petName: 'Jimmy'
			}
		]
	},
	{
		ownerName: 'Mary',
		cats: [
			{
				petName: 'Huey',
			},
			{
				petName: 'Dewey',
			},
		],
		dogs: [
			{
				petName: 'Louie',
			}
		]
	}
];

// export const expectedTwoLayerResult = [
// 	{
// 		ownerName: 'Peter',
// 		petTypes: [
// 			{
// 				type: 'Dog',
// 				pets: [
// 					{ petName: 'Rex' }
// 				]
// 			}
// 		]
// 	},
// 	{
// 		ownerName: 'John',
// 		petTypes: [
// 			{
// 				type: 'Dog',
// 				pets: [
// 					{ petName: 'Lassie' }
// 				]
// 			},
// 			{
// 				type: 'Cat',
// 				pets: [
// 					{ petName: 'Oliver' }
// 				]
// 			}
// 		]
// 	},
// 	{
// 		ownerName: 'Mary',
// 		petTypes: [
// 			{
// 				type: 'Cat',
// 				pets: [
// 					{ petName: 'Huey' },
// 					{ petName: 'Dewey' },
// 					{ petName: 'Louie' },
// 				]
// 			}
// 		]
// 	}
// ];
