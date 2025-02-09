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
    if (savedSearchValue) {
      this.props.onSearch(savedSearchValue);
      this.setState({ searchValue: savedSearchValue });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    this.setState({ searchValue: value });
    localStorage.setItem('searchValue', value);
  };

  handleSearch = () => {
    const searchValue = this.state.searchValue.trim();
    this.props.onSearch(searchValue);
    console.log(searchValue);
  };

  render() {
    return (
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="border rounded p-1"
          placeholder="Enter name..."
          onChange={this.handleInputChange}
          value={this.state.searchValue}
        />
        <button
          type="button"
          className="bg-rose-600 font-semibold rounded px-3 py-1"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
