interface CardProps {
  name: string;
  description: string;
  image: string;
  onClick: (pokemonName: string) => void;
}

const Card: React.FC<CardProps> = ({ name, description, image, onClick }) => {
  return (
    <div
      onClick={() => onClick(name)}
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
    </div>
  );
};

export default Card;
