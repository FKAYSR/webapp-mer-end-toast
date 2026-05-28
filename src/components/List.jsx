export default function List({title = "Vare kategori"}) {
  return (
    <section>
      <h2>{title}</h2>
      <ul className="liste-punkter">
        <li>Supabase item</li>
        <li>Vare</li>
        <li>Vare</li>
      </ul>
    </section>
  );
}
