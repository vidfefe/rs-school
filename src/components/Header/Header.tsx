import { FC } from 'react';
import Search from '@/components/Header/Search';
import ThemeToggle from '../ThemeToggle';

interface HeaderProps {
  onSearch: (searchValue: string) => void;
  initialValue?: string;
}

const Header: FC<HeaderProps> = ({ onSearch, initialValue = '' }) => {
  return (
    <header className="flex items-center justify-center gap-5 relative ">
      <div className="flex flex-col items-center justify-center gap-5 ">
        <h1 className="text-2xl font-bold">Pokémon Search</h1>
        <Search onSearch={onSearch} initialValue={initialValue} />
      </div>
      <div className="absolute right-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
