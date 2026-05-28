import Checkbox from "./Checkbox";

export default function List({title = "Vare kategori"}) {
  return (
    <section>
      <h2>{title}</h2>
      <ul className="liste-punkter">
        <li>
          <label className="liste-række">
            Supabase item <Checkbox />
          </label>
        </li>
        <li>
          <label className="liste-række">
            Supabase item <Checkbox />
          </label>
        </li>
        <li>
          <label className="liste-række">
            Supabase item <Checkbox />
          </label>
        </li>
      </ul>
    </section>
  );
}
