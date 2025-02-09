import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';

const App = () => {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
};

export default App;
