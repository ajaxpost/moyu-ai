import { ModeToggle } from "../mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <svg
          className="h-8 w-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span className="ml-2 text-xl font-semibold">Logo</span>
      </div>
      <ModeToggle />
    </header>
  );
}
