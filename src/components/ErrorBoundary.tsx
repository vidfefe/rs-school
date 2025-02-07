import { Component, ErrorInfo, ReactNode } from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children?: ReactNode }, State> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong. Please try again later.</h1>
          <button onClick={this.handleReset}>Reset functionality</button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
