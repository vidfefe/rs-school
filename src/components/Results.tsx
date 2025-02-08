import { Component } from 'react';

interface Result {
  name: string;
  description: string;
  image: string;
}

interface ResultsProps {
  results: Result[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { results } = this.props;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {results.map((pokemon, index) => (
          <div
            className="flex-col border border-rose-600 rounded shadow w-[302px]"
            key={index}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="text-2xl font-bold">{pokemon.name}</h2>
            <p>{pokemon.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
