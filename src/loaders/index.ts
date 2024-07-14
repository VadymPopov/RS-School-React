import { LoaderFunctionArgs } from 'react-router-dom';
import { getStarShipDetails } from '../services';

export async function shipLoader({ params }: LoaderFunctionArgs) {
  const { shipId } = params;
  if (!shipId) {
    throw new Error('Ship id is required');
  }
  const shipDetails = await getStarShipDetails(shipId);
  return { shipDetails };
}
