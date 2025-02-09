import { Component, ReactNode } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';

class App extends Component<object> {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    );
  }
}

export default App;
