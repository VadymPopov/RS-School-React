import { FormEvent } from 'react';
import Form from '../components/Form';
import ShipsList from '../components/ShipsList';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ThemedDropdown from '../components/ThemedDropdown';
import { starshipApi } from '../redux/swapi';
import Error from '../components/Error';
import { setStarships } from '../redux/starShipSlice';
import { useAppDispatch } from '../redux/hooks';

export default function StarWarsView({
  showSplitScreen,
}: {
  showSplitScreen: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery } = useLocalStorage();
  const [totalPages, setTotalPages] = useState<number>(0);
  const page = searchParams.get('page') || '1';
  const location = useLocation();
  const { data, error, isLoading } = starshipApi.useGetStarShipsQuery({
    searchQuery,
    page,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      setTotalPages(Math.round(Number(data?.count) / 10));
      dispatch(setStarships(data.results));
    }
  }, [data, dispatch]);

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

  if (error) {
    return <Error error={error} />;
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
        <Form onSubmit={onSubmit} />
      </section>
      <section>
        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <ShipsList ships={data?.results || []} />
        )}
        <Pagination totalPages={totalPages} />
      </section>
    </main>
  );
}
