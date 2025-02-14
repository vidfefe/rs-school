import { useTheme } from '@/context/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-rose-600 p-1 transition-all flex items-center justify-between"
    >
      <span className="text-lg">🌞</span>
      <span className="text-lg">🌙</span>

      <div
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${
          isDark ? 'translate-x-0' : 'translate-x-6'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
