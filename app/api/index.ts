const baseUrl = 'https://swapi.dev/api/starships/';

export async function getStarships(
  searchQuery?: string | null,
  page?: string | null
) {
  try {
    const url = new URL(baseUrl);

    if (searchQuery) {
      url.searchParams.append('search', searchQuery);
    }

    if (page) {
      url.searchParams.append('page', page);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching starships:', error);
    throw error;
  }
}

export async function getStarshipsDetails(shipId: string) {
  try {
    const response = await fetch(`${baseUrl}/${shipId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching starship details:', error);
    throw error;
  }
}
