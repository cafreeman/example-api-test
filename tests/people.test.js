const axios = require('axios');
const Luke = require('../fixtures/lukeSkywalker');

const SWAPI = 'http://swapi.co/api';

// make axios fill in the first part of the URL for us
axios.defaults.baseURL = SWAPI;

describe('/people', () => {
  let response, body;

  beforeAll(async () => {
    response = await axios.get('/people');
    body = response.data;
  });

  test('the response has a count property', () => {
    expect(body).toHaveProperty('count');
  });

  test('returns a results key that contains an array', () => {
    expect(body).toHaveProperty('results');
    expect(body.results).toBeInstanceOf(Array);
  });

  test('the results array contains a person object', () => {
    expect(body.results[0]).toEqual(Luke);
  });
});

describe('/people?search=', () => {
  test('looking up luke by name', async () => {
    const response = await axios.get('/people?search=luke');
  
    expect(response.data.results).toContainEqual(Luke)
  });
});

describe('/people/:id', () => {
  test('looking up luke by id', async () => {
    const response = await axios.get('/people/1');

    expect(response.data).toEqual(Luke)
  });
});
