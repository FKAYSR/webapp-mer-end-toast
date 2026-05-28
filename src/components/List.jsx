import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { supabase } from "../supabaseClient";

export default function List({title = "Vare kategori", table = "ingredienser"}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
     (async () => {
       try {
         setLoading(true);
         const { data, error } = await supabase
           .from(table)
           .select("*")
           .eq("added_to_list", true)
           .order("id", { ascending: true })
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
              <span>{item.standard_mængde}</span>
              <span>{item.enhed}</span>
              <span>{item.navn}</span> 
              <Checkbox />
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
