export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg- px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[--color-accent]">404</h1>

        <h2 className="mt-4 text-2xl font-semibold ">Page not found</h2>

        <p className="mt-2 text-sm text-[--color-text-muted]">
          The page you are looking for does not exist or has been moved.
        </p>

        <a
          href="/"
          className="inline-block mt-6 px-5 py-2 rounded-lg bg-bg text-[--color-text-primary] text-sm font-medium hover:opacity-90 transition"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
