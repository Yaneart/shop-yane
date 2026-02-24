import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <Helmet>
        <title>404 — Page Not Found</title>
      </Helmet>
      <p className="text-text/20 text-[10rem] leading-none font-bold select-none sm:text-[14rem]">
        404
      </p>

      <h1 className="text-text mt-4 text-2xl font-bold sm:text-3xl">
        Page not found
      </h1>

      <p className="text-text-tertiary mt-3 max-w-sm text-base">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-accent text-accent-text mt-8 rounded-full px-8 py-3 text-sm font-medium transition-opacity hover:opacity-80"
      >
        Back to Home
      </Link>
    </section>
  );
}
