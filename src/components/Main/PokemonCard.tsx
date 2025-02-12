interface PokemonCardProps {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  description,
  image,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className="flex-col border border-white hover:border-rose-600 transition-all  rounded shadow w-[255px] p-2"
    >
      <img
        src={image}
        alt={name}
        width={250}
        height={250}
        className="mx-auto"
      />
      <h2 className="text-2xl font-bold">{name}</h2>
      <p>{description}</p>
    </li>
  );
};

export default PokemonCard;
