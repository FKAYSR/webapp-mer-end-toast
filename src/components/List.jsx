import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { supabase } from "../supabaseClient";

export default function List({table = "ingredienser", showPrice = true}) {
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
           .order("afdeling", {ascending: true})
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

    const groupedItems = items.reduce((groups, item) => {
      const afdeling = item.afdeling ?? "Ukendt afdeling";
      if (!groups[afdeling]) groups[afdeling] = [];
      groups[afdeling].push(item);
      return groups;
    }, {}); 

  return (
    <>
    {Object.entries(groupedItems).map(([afdeling, afdelingItems]) => (
    <section key={afdeling}>
      <h2>{afdeling}</h2>
      {loading && <p>Indlæser...</p>}
      {error && <p>Fejl: {error.message}</p>}
      <ul className="liste-punkter">
        {afdelingItems.map((item) => (
          <li key={item.id}>
            <label className="liste-række">
              <span>{item.standard_mængde}</span>
              <span>{item.enhed}</span>
              <span>{item.navn}</span>
              {showPrice && (
                <span className="pris">
                  {Number(item.pris ?? 0).toLocaleString("da-DK", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })} kr
                </span>
              )}
              <Checkbox />
            </label>
          </li>
        ))}
      </ul>
    </section>
    ))}
    </>
  );
}
