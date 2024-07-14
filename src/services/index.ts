const baseUrl = 'https://swapi.dev/api/starships/';

export async function getStarShips(query: string) {
  const url = query ? baseUrl + `?search=${query}` : baseUrl;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getStarShipDetails(id: string) {
  const url = `${baseUrl}/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
