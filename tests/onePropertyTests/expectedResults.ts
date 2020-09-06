// Expected result for a very simple one layer mapping including non-grouped children elements:
export const oneLayerResultWithChildren = {
	owners: [
		{
			ownerName: 'Peter',
			children: [
				{
					petName: 'Rex',
					petType: 'Dog',
					ownerAge: 50
				}
			]
		},
		{
			ownerName: 'John',
			children: [
				{
					petName: 'Lassie',
					petType: 'Dog',
					ownerAge: 25
				},
				{
					petName: 'Oliver',
					petType: 'Cat',
					ownerAge: 25
				}
			]
		},
		{
			ownerName: 'Mary',
			children: [
				{
					petName: 'Huey',
					petType: 'Cat',
					ownerAge: 65
				},
				{
					petName: 'Dewey',
					petType: 'Cat',
					ownerAge: 65
				},
				{
					petName: 'Louie',
					petType: 'Cat',
					ownerAge: 65
				}
			]
		}
	]};

// Expected result for a very simple one layer mapping without non-grouped children elements:
export const oneLayerResultWithoutChildren = {
	owners: [
		{
			ownerName: 'Peter',
		},
		{
			ownerName: 'John',
		},
		{
			ownerName: 'Mary',
		}
	]};

export const expectedOneLayerResult = {
	owners: [
		{
			ownerName: 'Peter',
			pets: [
				{
					petName: 'Rex',
					petType: 'Dog',
					ownerAge: 50
				}
			]
		},
		{
			ownerName: 'John',
			pets: [
				{
					petName: 'Lassie',
					petType: 'Dog',
					ownerAge: 25
				},
				{
					petName: 'Oliver',
					petType: 'Cat',
					ownerAge: 25
				}
			]
		},
		{
			ownerName: 'Mary',
			pets: [
				{
					petName: 'Huey',
					petType: 'Cat',
					ownerAge: 65
				},
				{
					petName: 'Dewey',
					petType: 'Cat',
					ownerAge: 65
				},
				{
					petName: 'Louie',
					petType: 'Cat',
					ownerAge: 65
				}
			]
		}
	]};

export const expectedTwoLayerResult = {
	owners: [
		{
			ownerName: 'Peter',
			petTypes: [
				{
					type: 'Dog',
					pets: [
						{
							petName: 'Rex',
							ownerAge: 50
						}
					]
				}
			]
		},
		{
			ownerName: 'John',
			petTypes: [
				{
					type: 'Dog',
					pets: [
						{
							petName: 'Lassie',
							ownerAge: 25
						}
					]
				},
				{
					type: 'Cat',
					pets: [
						{
							petName: 'Oliver',
							ownerAge: 25
						}
					]
				}
			]
		},
		{
			ownerName: 'Mary',
			petTypes: [
				{
					type: 'Cat',
					pets: [
						{
							petName: 'Huey',
							ownerAge: 65
						},
						{ petName: 'Dewey',
							ownerAge: 65
						},
						{ petName: 'Louie',
							ownerAge: 65
						},
					]
				}
			]
		}
	]};



export const expectedOneLayerResultWithCollectedProperty = {
	owners: [
		{
			ownerName: 'Peter',
			ownerAge: 50,
			pets: [
				{
					petName: 'Rex',
					petType: 'Dog',
				}
			]
		},
		{
			ownerName: 'John',
			ownerAge: 25,
			pets: [
				{
					petName: 'Lassie',
					petType: 'Dog',
				},
				{
					petName: 'Oliver',
					petType: 'Cat',
				}
			]
		},
		{
			ownerName: 'Mary',
			ownerAge: 65,
			pets: [
				{
					petName: 'Huey',
					petType: 'Cat',
				},
				{
					petName: 'Dewey',
					petType: 'Cat',
				},
				{
					petName: 'Louie',
					petType: 'Cat',
				}
			]
		}
	]};

export const expectedTwoLayerResultWithCollectedProperty = {
	owners: [
		{
			ownerName: 'Peter',
			ownerAge: 50,
			petTypes: [
				{
					type: 'Dog',
					pets: [
						{
							petName: 'Rex',
						}
					]
				}
			]
		},
		{
			ownerName: 'John',
			ownerAge: 25,
			petTypes: [
				{
					type: 'Dog',
					pets: [
						{
							petName: 'Lassie',
						}
					]
				},
				{
					type: 'Cat',
					pets: [
						{
							petName: 'Oliver',
						}
					]
				}
			]
		},
		{
			ownerName: 'Mary',
			ownerAge: 65,
			petTypes: [
				{
					type: 'Cat',
					pets: [
						{
							petName: 'Huey',
						},
						{ petName: 'Dewey',
						},
						{ petName: 'Louie',
						},
					]
				}
			]
		}
	]};
