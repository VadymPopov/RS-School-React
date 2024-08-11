import { FormEvent } from 'react';
import Form from '../components/Form';
import ShipsList from '../components/ShipsList';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import {
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import ThemedDropdown from '../components/ThemedDropdown';
import { setStarships } from '../redux/starShipSlice';
import { useAppDispatch } from '../redux/hooks';
import { StarShipsData } from '../types';

export default function StarWarsView({
  showSplitScreen,
  data,
}: {
  showSplitScreen: boolean;
  data: StarShipsData;
}) {
  const [, setSearchParams] = useSearchParams();
  const { setSearchQuery } = useLocalStorage();
  const [totalPages, setTotalPages] = useState<number>(0);
  const location = useLocation();
  const { state } = useNavigation();

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
        {state === 'loading' ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <ShipsList ships={data?.results || []} />
        )}
        <Pagination totalPages={totalPages} />
      </section>
    </main>
  );
}
