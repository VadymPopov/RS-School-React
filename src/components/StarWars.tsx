import { BaseSyntheticEvent, FormEvent } from 'react';
import Form from '../components/Form';
import ShipsList from '../components/ShipsList';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import ThemedDropdown from '../components/ThemedDropdown';
import { starshipApi } from '../redux/swapi';
import Error from '../components/Error';
import { setStarships } from '../redux/starShipSlice';
import { useAppDispatch } from '../redux/hooks';

import { useRouter } from 'next/router';

export default function StarWarsView({
  showSplitScreen,
}: {
  showSplitScreen: boolean;
}) {
  const router = useRouter();

  const { searchQuery, setSearchQuery } = useLocalStorage();
  const [totalPages, setTotalPages] = useState<number>(0);
  const page = (router.query.page as string) || '1';

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

  const handleLeftPaneClick = (e: BaseSyntheticEvent<MouseEvent>) => {
    const { q, page } = router.query;
    e.preventDefault();

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

    router.replace(path);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchQuery = form.query.value.trim();
    setSearchQuery(searchQuery);

    router.push({
      pathname: router.pathname,
      query: { q: searchQuery, page: 1 },
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
          <div className="loader-container" data-testid="loader">
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
