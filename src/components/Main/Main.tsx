import PokemonList from '@/components/Main/PokemonList';
import Pagination from '@/components/Main/Pagination';
import PokemonCardDetails from './PokemonCardDetails';

const Main = () => {
  return (
    <div className="flex h-full w-full gap-6 p-4">
      <main className="flex flex-col flex-grow items-center gap-5">
        <PokemonList />
        <Pagination />
      </main>
      <PokemonCardDetails />
    </div>
  );
};

export default Main;
