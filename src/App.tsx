import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ReactHookFormPage from './pages/ReactHookForm';
import UncontrolledFormPage from './pages/UncontrolledForm';
import MainPage from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route
            path="/uncontrolled"
            element={<UncontrolledFormPage />}
          ></Route>
          <Route
            path="/react-hook-form"
            element={<ReactHookFormPage />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
