import { Component } from 'react';
import StarWarsView from './views/StarWars';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <StarWarsView />
      </ErrorBoundary>
    );
  }
}

export default App;
