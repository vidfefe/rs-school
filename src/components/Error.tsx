import { FC } from 'react';

interface ErrorProps {
  errorMessage: string;
}

const Error: FC<ErrorProps> = ({ errorMessage }) => {
  return <div className="text-center text-red-500">{errorMessage}</div>;
};

export default Error;
