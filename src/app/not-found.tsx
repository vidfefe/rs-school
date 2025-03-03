import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <Link href="/">
        <button
          type="button"
          className="bg-rose-600 font-semibold rounded px-3 py-1"
        >
          Go to Home page
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
