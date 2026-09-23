"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-4">
      <h1 className="text-xl font-bold">Something went wrong!</h1>
      {error.digest && (
        <p className="text-sm text-gray-500">Error digest: {error.digest}</p>
      )}
      <button className="btn btn-sm btn-primary" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
