import { NextPage, NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number;
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-96">
      <h1>{statusCode ? `Error ${statusCode}` : 'An error occurred'}</h1>
      <p>Please try again later.</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default ErrorPage;
