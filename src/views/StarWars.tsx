import { FormEvent } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ShipsList from '../components/ShipsList';
import Loader from '../components/Loader';
import useLocalStorage from '../hooks/useLocalStorage';
import useFetchData from '../hooks/useFetchData';

export default function StarWarsView() {
  const { searchQuery, setSearchQuery } = useLocalStorage();
  const { starShips, error, loading, triggerError } = useFetchData(searchQuery);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchQuery = form.query.value.trim();
    setSearchQuery(searchQuery);
  };

  if (error) {
    throw new Error(error);
  }

  return (
    <main className="main-container">
      <section>
        <Form onSubmit={onSubmit}>
          <InputField label="Search you Star Wars ship: " name="query" />
          <div className="buttons">
            <Button label="Search" type="submit" />
            <Button label="Error" type="button" onClick={triggerError} />
          </div>
        </Form>
      </section>
      <section>
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <ShipsList ships={starShips} />
        )}
      </section>
    </main>
  );
}
