import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <button
        type="button"
        className="bg-rose-600 font-semibold rounded px-3 py-1"
        onClick={() => router.push('/')}
      >
        Go to Home page
      </button>
    </div>
  );
};

export default NotFoundPage;
