import { FormEvent } from 'react';
import Form from '../components/Form';
import ShipsList from '../components/ShipsList';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getStarShips } from '../services';
import { StarShip } from '../types';
import ThemedDropdown from '../components/ThemedDropdown';

export default function StarWarsView({
  showSplitScreen,
}: {
  showSplitScreen: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery } = useLocalStorage();
  const [error, setError] = useState<string>();
  const [starShips, setStarShips] = useState<StarShip[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const page = searchParams.get('page') || '1';
  const location = useLocation();

  useEffect(() => {
    const fetchStarShips = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getStarShips(searchQuery, page);
        setStarShips(data?.results);
        setTotalPages(Math.round(Number(data?.count) / 10));
      } catch (error: unknown) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStarShips();
  }, [searchQuery, page]);

  const navigate = useNavigate();
  const handleLeftPaneClick = () => {
    navigate(`/${location.search}`);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchQuery = form.query.value.trim();
    setSearchQuery(searchQuery);
    setSearchParams({
      search: searchQuery,
      page: '1',
    });
  };

  const triggerError = (): void => {
    setError('This is a simulated error.');
  };

  if (error) {
    throw new Error(error);
  }

  return (
    <main
      className="main-container"
      onClick={showSplitScreen ? handleLeftPaneClick : () => {}}
    >
      <div>
        <ThemedDropdown />
      </div>
      <section>
        <Form onSubmit={onSubmit} triggerError={triggerError} />
      </section>
      <section>
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <ShipsList ships={starShips} />
        )}
        <Pagination totalPages={totalPages} />
      </section>
    </main>
  );
}
