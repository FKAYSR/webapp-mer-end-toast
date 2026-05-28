import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { supabase } from "../supabaseClient";

export default function List({title = "Vare kategori", table = "items"}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
     const ac = new AbortController();
     (async () => {
       try {
         setLoading(true);
         const { data, error } = await supabase
           .from(table)
           .select("*")
           .order("id", { ascending: true })
           .abortSignal(ac.signal);
         if (error) throw error;
         setItems(data ?? []);
       } catch (err) {
         if (err.name !== "AbortError") {
           setError(err);
           console.error(err);
         }
       } finally {
         setLoading(false);
       }
     })();
     return () => ac.abort();
   }, [table]);

  return (
    <section>
      <h2>{title}</h2>
      {loading && <p>Indlæser...</p>}
      {error && <p>Fejl: {error.message}</p>}
      <ul className="liste-punkter">
        {items.map((item) => (
          <li key={item.id}>
            <label className="liste-række">
              <span>{item.name}</span> 
              <Checkbox />
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
