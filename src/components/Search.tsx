import { ChangeEvent, Component } from 'react';

interface SearchState {
  searchValue: string;
}

interface SearchProps {
  onSearch: (searchValue: string) => void;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchValue: '' };
  }

  componentDidMount(): void {
    const savedSearchValue: string = localStorage.getItem('searchValue') || '';
    this.setState({ searchValue: savedSearchValue });
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    this.setState({ searchValue: value });
  };

  handleSearch = () => {
    const searchValue = this.state.searchValue.trim();
    localStorage.setItem('searchValue', searchValue);
    this.props.onSearch(searchValue);
    console.log(this.state.searchValue);
  };

  render() {
    return (
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="border rounded p-1"
          placeholder="Enter search value..."
          onChange={this.handleInputChange}
          defaultValue={this.state.searchValue}
        />
        <button
          type="button"
          className="bg-rose-600 font-semibold rounded p-1"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
