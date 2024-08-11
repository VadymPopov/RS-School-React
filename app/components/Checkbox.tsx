export default function Checkbox({
  isChecked,
  onChange,
}: {
  isChecked: boolean;
  onChange: () => void;
}) {
  return (
    <div>
      <label>
        <p>{isChecked ? 'selected' : 'unselected'}</p>
        <input type="checkbox" checked={isChecked} onChange={onChange} />
      </label>
    </div>
  );
}
