interface PokemonCardProps {
  name: string;
  description: string;
  image: string;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  onSelect: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  description,
  image,
  isSelected,
  onClick,
  onSelect,
}) => {
  return (
    <li
      onClick={onClick}
      className="flex-col border border-gray-300 dark:border-white rounded p-2 hover:border-rose-600 transition-all shadow w-[255px] "
    >
      <img
        src={image}
        alt={name}
        width={250}
        height={250}
        className="mx-auto"
      />
      <div className=" flex flex-row items-center gap-2">
        <h2 className="text-2xl font-bold">{name}</h2>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-5 h-5 appearance-none border border-gray-400 rounded checked:bg-rose-600 checked:border-rose-600 flex items-center justify-center relative 
                    before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100"
        />
      </div>
      <p>{description}</p>
    </li>
  );
};

export default PokemonCard;
