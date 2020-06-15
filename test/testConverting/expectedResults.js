// Expected result for one layer mapping:
const expectedOneLayerResult = [
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

const expectedTwoLayerResult = [
  {
    ownerName: 'Peter',
    petTypes: [
      {
        type: 'Dog',
        animals: [
          { name: 'Rex' }
        ]
      }
    ]
  },
  {
    ownerName: 'John',
    petTypes: [
      {
        type: 'Dog',
        animals: [
          { name: 'Lassie' }
        ]
      },
      {
        type: 'Cat',
        animals: [
          { name: 'Oliver' }
        ]
      }
    ]
  },
  {
    ownerName: 'Mary',
    petTypes: [
      {
        type: 'Cat',
        animals: [
          { name: 'Huey' },
          { name: 'Dewey' },
          { name: 'Louie' },
        ]
      }
    ]
  }
];


module.exports = {
  expectedOneLayerResult,
  expectedTwoLayerResult
};
