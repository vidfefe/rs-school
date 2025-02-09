import { useState } from 'react';

const ErrorButton = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    throw new Error('Test Error!');
  }

  return (
    <button
      type="button"
      className="bg-rose-600 font-semibold rounded px-3 py-1"
      onClick={() => setHasError(true)}
    >
      Error
    </button>
  );
};

export default ErrorButton;
