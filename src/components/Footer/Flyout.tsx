import { unselectAllPokemons } from '@/store/selectedPokemonsSlice';
import { RootState } from '@/store/store';
import { CsvData, downoloadCsv } from '@/utils/downloadCsv';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Flyout: FC = () => {
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );
  const dispatch = useDispatch();

  const handleDownload = () => {
    const data: CsvData[] = selectedPokemons.map((name) => ({
      name,
      detailsURL: `https://pokeapi.co/api/v2/pokemon/${name}`,
    }));

    downoloadCsv(data, `${selectedPokemons.length}_pokemons.csv`);
  };

  const handleUnselectAll = () => {
    dispatch(unselectAllPokemons());
  };

  return (
    <div
      className={`border-2 border-gray-300 dark:border-white bg-white dark:bg-[#242424] fixed bottom-3 left-1/2  transform -translate-x-1/2 rounded-lg  px-3 py-4 shadow-lg flex items-center gap-5  transition-all ${selectedPokemons.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
    >
      <h5>
        {selectedPokemons.length} pokemon{selectedPokemons.length > 0 && 's'}{' '}
        selected
      </h5>
      <button
        className="bg-rose-600 font-semibold rounded px-3 py-1"
        type="button"
        onClick={handleUnselectAll}
      >
        Unselect all
      </button>
      <button
        className="bg-rose-600 font-semibold rounded px-3 py-1"
        type="button"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
};

export default Flyout;
