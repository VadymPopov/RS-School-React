import useTheme from '../hooks/useTheme';

const ThemedDropdown = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <select
      value={theme}
      onChange={handleChange}
      className={`dropdown ${theme}`}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};

export default ThemedDropdown;
