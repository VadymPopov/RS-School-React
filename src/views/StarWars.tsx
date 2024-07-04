import { Component, FormEvent } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ShipsList from '../components/ShipsList';
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
}

class StarWarsView extends Component<object, StarWarsState> {
  constructor(props: object) {
    super(props);
    this.state = {
      starShips: [],
      error: null,
    };
  }

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchQuery = form.query.value.trim();
    localStorage.setItem('searchQuery', searchQuery);

    getStarShips(searchQuery)
      .then((data) => {
        console.log(data.results);
        this.setState({ starShips: data.results, error: null });
      })
      .catch((error) => {
        this.setState({ starShips: [], error: error.message });
      });
  };

  triggerError = () => {
    this.setState({ error: 'This is a simulated error.' });
  };

  render() {
    const { starShips, error } = this.state;

    if (error) {
      throw new Error(error);
    }

    return (
      <>
        <section>
          <Form onSubmit={this.onSubmit}>
            <InputField label="Search: " name="query" />
            <Button label="Search" type="submit" />
            <Button label="Error" type="button" onClick={this.triggerError} />
          </Form>
        </section>
        <section>
          <ShipsList ships={starShips} />
        </section>
      </>
    );
  }
}

export default StarWarsView;
