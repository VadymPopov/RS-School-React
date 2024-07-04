import { Component, FormEvent } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ShipsList from '../components/ShipsList';
import Loader from '../components/Loader';
import getStarShips from '../services';

export interface StarShip {
  name: string;
  model: string;
  manufacturer: string;
  passengers: string;
  created: string;
  max_atmosphering_speed: string;
}

interface StarWarsState {
  starShips: StarShip[];
  error: string | null;
  loading: boolean;
}

class StarWarsView extends Component<object, StarWarsState> {
  constructor(props: object) {
    super(props);
    this.state = {
      starShips: [],
      error: null,
      loading: true,
    };
  }

  fetchStarShips = (searchQuery: string): void => {
    getStarShips(searchQuery)
      .then((data) => {
        this.setState({ starShips: data.results, error: null, loading: false });
      })
      .catch((error) => {
        this.setState({ starShips: [], error: error.message, loading: false });
      });
  };

  componentDidMount(): void {
    this.fetchStarShips(localStorage.getItem('searchQuery') || '');
  }

  onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchQuery = form.query.value.trim();
    localStorage.setItem('searchQuery', searchQuery);
    this.setState({ loading: true });
    this.fetchStarShips(searchQuery);
  };

  triggerError = (): void => {
    this.setState({ error: 'This is a simulated error.' });
  };

  render() {
    const { starShips, error, loading } = this.state;

    if (error) {
      throw new Error(error);
    }

    return (
      <main className="main-container">
        <section>
          <Form onSubmit={this.onSubmit}>
            <InputField label="Search you Star Wars ship: " name="query" />
            <div className="buttons">
              <Button label="Search" type="submit" />
              <Button label="Error" type="button" onClick={this.triggerError} />
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
}

export default StarWarsView;
