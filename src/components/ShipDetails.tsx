import Loader from './Loader';
import Error from './Error';
import { starshipApi } from '../redux/swapi';
import { useRouter } from 'next/router';

export default function ShipDetails() {
  const router = useRouter();
  const { q, page, shipId } = router.query;
  const path = (() => {
    if (q && page) {
      return `/?q=${q}&page=${page}`;
    } else if (q) {
      return `/?q=${q}`;
    } else if (page) {
      return `/?page=${page}`;
    } else {
      return '/';
    }
  })();

  const { data, error, isLoading } = starshipApi.useGetStarShipDetailsQuery(
    (shipId as string) || '1'
  );

  if (isLoading) {
    return (
      <div className="flex" data-testid="loader">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div data-testid="details">
      <button className="fixed-button" onClick={() => router.push(path)}>
        Close
      </button>
      <div>
        <div>
          <h2>{data?.name}</h2>
        </div>
        <div>
          <p>
            <strong>Model:</strong> {data?.model}
          </p>
          <p>
            <strong>Manufacturer:</strong> {data?.manufacturer}
          </p>
          <p>
            <strong>Passengers:</strong> {data?.passengers}
          </p>
          <p>
            <strong>Created:</strong> {data?.created?.split('T')[0]}
          </p>
          <p>
            <strong>Max Atmospheric Speed:</strong>{' '}
            {data?.max_atmosphering_speed}
          </p>
          <p>
            <strong>Length:</strong> {data?.length}
          </p>
          <p>
            <strong>Crew:</strong> {data?.crew}
          </p>
          <p>
            <strong>Cost:</strong> {data?.cost_in_credits}
          </p>
        </div>
      </div>
    </div>
  );
}
