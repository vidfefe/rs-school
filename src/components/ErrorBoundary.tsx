import React, { Component, ErrorInfo, ReactNode } from 'react';

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
        <div className="flex flex-col gap-5 justify-center items-center min-h-96">
          <h1>Something went wrong. Please try again later.</h1>
          <button
            onClick={this.handleReset}
            type="button"
            className="bg-rose-600 font-semibold rounded px-3 py-1"
          >
            Reset functionality
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
