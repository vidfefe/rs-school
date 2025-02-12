import { FC } from 'react';
import Search from '@/components/Header/Search';

interface HeaderProps {
  onSearch: (searchValue: string) => void;
  initialValue?: string;
}

const Header: FC<HeaderProps> = ({ onSearch, initialValue = '' }) => {
  return (
    <header className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Pokémon Search</h1>
      <Search onSearch={onSearch} initialValue={initialValue} />
    </header>
  );
};

export default Header;
