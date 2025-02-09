import { Component } from 'react';

interface ErrorButtonState {
  hasError: boolean;
}

class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test Error!');
    }
    return (
      <button
        type="button"
        className="bg-rose-600 font-semibold rounded px-3 py-1"
        onClick={this.handleClick}
      >
        Error
      </button>
    );
  }
}

export default ErrorButton;
