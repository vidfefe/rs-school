import { Component, ErrorInfo, ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children?: ReactNode;
  navigate: () => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.navigate();
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

const ErrorBoundaryWithNavigate = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary navigate={() => navigate('/')}>{children}</ErrorBoundary>
  );
};

export default ErrorBoundaryWithNavigate;
