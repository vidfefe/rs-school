import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/search/1" />} />
          <Route path="/search/:page" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
