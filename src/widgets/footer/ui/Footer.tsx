import { GitHub } from '@/shared/ui/custom-icon/CustomIcons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:gap-6 sm:px-6 sm:py-5 lg:px-8">
        <p className="text-text text-xl font-medium">&copy; {year} Yane</p>

        <div className="border-border text-text-tertiary flex items-center gap-3 rounded-full border px-4 py-2 text-xl">
          <span>
            Сделано с<span className="pl-3">❤️</span>
          </span>
          <a
            href="https://t.me/Yaneart"
            className="text-text-tertiary hover:text-accent-hover font-medium transition-colors"
          >
            Связаться
          </a>
        </div>

        <a
          href="https://github.com/Yaneart"
          target="_blank"
          rel="noreferrer"
          className="text-text hover:bg-bg-tertiary flex items-center gap-2 rounded-full px-4 py-2 text-xl font-medium transition-all"
        >
          <GitHub />
          Yaneart
        </a>
      </div>
    </footer>
  );
}
