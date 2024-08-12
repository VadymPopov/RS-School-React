import ShipDetails from '../components/ShipDetails';
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { getStarshipsDetails } from '../api';
import { useLoaderData } from '@remix-run/react';
import { StarShipDetails } from '../types';

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({ params }) => {
  try {
    const shipId = params.shipId;
    const data = await getStarshipsDetails(shipId as string);
    return json(data);
  } catch (error) {
    return json(null, { status: 500 });
  }
};

export default function Details() {
  const data = useLoaderData<StarShipDetails>();

  return <ShipDetails data={data} />;
}
