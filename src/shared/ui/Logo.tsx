export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 40"
      fill="none"
      className={className}
    >
      <rect x="2" y="6" width="28" height="28" rx="7" fill="currentColor" />
      <path
        d="M10 16h12l-1.5 10h-9L10 16z"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 16v-2.5a2.5 2.5 0 1 1 5 0V16"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <text
        x="38"
        y="28"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        YANE
      </text>
    </svg>
  );
}
