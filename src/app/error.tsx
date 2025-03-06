'use client';
import { notFound } from 'next/navigation';

interface ErrorPageProps {
  statusCode?: number;
}

export default function ErrorPage({ statusCode = 500 }: ErrorPageProps) {
  if (statusCode === 404) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-96">
      <h1 className="text-2xl font-bold">{`Error ${statusCode}`}</h1>
      <p>Please try again later</p>
    </div>
  );
}
