/**
 * Mock-up of a piece of data that could be returned from a DB-Query
 */
const testData = {
  head: ['personName', 'petName', 'petType'],
  results: [
    {
      personName: {
        type: 'String',
        value: 'Alex',
      },
      petName: {
        type: 'String',
        value: 'Rex'
      },
      petType: {
        type: 'String',
        value: 'Dog'
      }
    },
    {
      personName: {
        type: 'String',
        value: 'John',
      },
      petName: {
        type: 'String',
        value: 'Lassie'
      },
      petType: {
        type: 'String',
        value: 'Dog'
      }
    },
    {
      personName: {
        type: 'String',
        value: 'John',
      },
      petName: {
        type: 'String',
        value: 'Oliver'
      },
      petType: {
        type: 'String',
        value: 'Cat'
      }
    },
    {
      personName: {
        type: 'String',
        value: 'Mary',
      },
      petName: {
        type: 'String',
        value: 'Huey'
      },
      petType: {
        type: 'String',
        value: 'Cat'
      }
    },
    {
      personName: {
        type: 'String',
        value: 'Mary',
      },
      petName: {
        type: 'String',
        value: 'Dewey'
      },
      petType: {
        type: 'String',
        value: 'Cat'
      }
    },
    {
      personName: {
        type: 'String',
        value: 'Mary',
      },
      petName: {
        type: 'String',
        value: 'Louie'
      },
      petType: {
        type: 'String',
        value: 'Cat'
      }
    },
  ]
};

export default testData;
