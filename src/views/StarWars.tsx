import { Component, FormEvent } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import InputField from '../components/InputField';

class StarWarsView extends Component {
  onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('submitted');
  }
  render() {
    return (
      <section>
        <Form onSubmit={this.onSubmit}>
          <InputField label="Search: " />
          <Button label="Search" />
        </Form>
      </section>
    );
  }
}

export default StarWarsView;
