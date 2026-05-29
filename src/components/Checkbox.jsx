export default function Checkbox({ defaultChecked = false, onChange }) {
  return (
    <label className="checkbox">
      <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} />
    </label>
  );
}
