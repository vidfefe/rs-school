import { Component } from 'react';
import Card from './Card';
import { fetchPokemon } from '../api/api';
import NoResults from './NoResults';
import Loader from './Loader';

interface Result {
  name: string;
  description: string;
  image: string;
}

interface ResultsState {
  results: Result[];
  isLoading: boolean;
  error: string | null;
}

interface ResultsProps {
  searchValue: string;
}

class Results extends Component<ResultsProps, ResultsState> {
  constructor(props: ResultsProps) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidUpdate(prevProps: Readonly<ResultsProps>): void {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.fetchData(this.props.searchValue);
    }
  }

  componentDidMount() {
    this.fetchData(this.props.searchValue);
  }

  fetchData = async (searchValue: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const results = await fetchPokemon(searchValue.trim());
      this.setState({ results, isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message, isLoading: false });
      }
    }
  };

  render() {
    const { results, isLoading, error } = this.state;

    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }

    if (results.length === 0) {
      return <NoResults />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {results.map((pokemon, index) => (
          <Card key={index} {...pokemon} />
        ))}
      </div>
    );
  }
}

export default Results;
