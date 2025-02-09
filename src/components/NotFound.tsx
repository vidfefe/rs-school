import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <button
        type="button"
        className="bg-rose-600 font-semibold rounded px-3 py-1"
        onClick={() => navigate('/')}
      >
        Go to Home page
      </button>
    </div>
  );
};

export default NotFound;
