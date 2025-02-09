import { Component } from 'react';

interface CardProps {
  name: string;
  description: string;
  image: string;
}

class Card extends Component<CardProps> {
  render() {
    const { name, description, image } = this.props;
    return (
      <div className="flex-col border border-white hover:border-rose-600 transition-all  rounded shadow w-[255px] p-2">
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
  }
}

export default Card;
