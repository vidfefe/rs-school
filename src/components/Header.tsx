import { Link } from 'react-router-dom';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <nav className="flex justify-around">
      <Link to="/">Main</Link>
      <Link to="/uncontrolled">Uncontrolled form</Link>
      <Link to="/react-hook-form">React Hook Form</Link>
    </nav>
  );
};

export default Header;
