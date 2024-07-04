const baseUrl = 'https://swapi.dev/api/starships/';

function getStarShips(query: string) {
  const url = query ? baseUrl + `?search=${query}` : baseUrl;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export default getStarShips;
