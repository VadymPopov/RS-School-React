import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  http.get('https://swapi.dev/api/starships/', async () => {
    await delay();
    return HttpResponse.json({
      count: 1,
      results: [
        {
          name: 'Falcon',
          model: 'YT-1300 light freighter',
          manufacturer: 'Corellian Engineering Corporation',
          passengers: '6',
          created: '2014-12-10',
          max_atmosphering_speed: '1050',
          cost_in_credits: '100000',
          crew: '4',
          length: '34.37',
          url: 'http://falcon.com/10',
        },
      ],
    });
  }),
  http.get('https://swapi.dev/api/starships/10', async () => {
    await delay();
    return HttpResponse.json({
      name: 'Falcon',
      model: 'YT-1300 light freighter',
      manufacturer: 'Corellian Engineering Corporation',
      passengers: '6',
      created: '2014-12-10',
      max_atmosphering_speed: '1050',
      cost_in_credits: '100000',
      crew: '4',
      length: '34.37',
    });
  })
);
