import { useTheme } from '@/context/useTheme';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full bg-gray-300 dark:bg-rose-600 p-1 transition-all flex items-center`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform translate-x-0 dark:translate-x-6 `}
      />
    </button>
  );
};

export default ThemeToggle;
