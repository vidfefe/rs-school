import { Component } from 'react';
import Search from '../components/Search';
import Results from '../components/Results';
import ErrorButton from '../components/ErrorButton';

interface HomeState {
  searchValue: string;
}

class Home extends Component<object, HomeState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  handleChangeSearch = (value: string) => {
    this.setState({ searchValue: value });
  };

  render() {
    return (
      <div className="container flex flex-col items-center justify-center gap-5 mx-auto my-5 max-w-4xl">
        <div>
          <Search onSearch={this.handleChangeSearch} />
        </div>
        <Results searchValue={this.state.searchValue} />
        <div className="self-end">
          <ErrorButton />
        </div>
      </div>
    );
  }
}

export default Home;
