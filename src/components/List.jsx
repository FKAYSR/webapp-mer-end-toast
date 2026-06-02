import { useCallback, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import EditModal from "./EditModal";
import { supabase } from "../supabaseClient";

export default function List({ table = "ingredienser", showPrice = true }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // <-- 2. OPPRETTELSE AF STATEN (Løser "setSelectedItem is not defined")
  const [selectedItem, setSelectedItem] = useState(null);

  // <-- 3. JETTE-FUNKTION (Flyttet ud af useEffect, så EditModal kan kalde den)
  // useCallback - React-hook, husker en funktion så REACT ikke behøver lave en ny version ved hver rendering
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("added_to_list", true)
        .order("afdeling", { ascending: true })
        .order("id", { ascending: true });
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
  }, [table]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchItems();
    }, 0);

    const handleRefresh = () => {
      fetchItems();
    };

    // lytter til eventet der blev sendt ud fra RecipeToList.jsx
    window.addEventListener("shoppinglist-updated", handleRefresh);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("shoppinglist-updated", handleRefresh);
    };
  }, [fetchItems]);

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
                <div className="liste-række">
                  <div
                    className="vare-tekst-klikbar"
                    onClick={() => setSelectedItem(item)} // Nu virker denne perfekt!
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <span>{item.standard_mængde}</span>
                    <span>{item.enhed}</span>
                    <span>{item.navn}</span>

                    {showPrice && (
                      <span className="pris">
                        {Number(item.pris ?? 0).toLocaleString("da-DK", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                        kr
                      </span>
                    )}
                  </div>
                  <Checkbox
                    defaultChecked={false}
                    onChange={(e) =>
                      console.log(`${item.navn} tjekket:`, e.target.checked)
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* <-- 4. INDSÆT MODALEN HER I BUNDEN */}
      <EditModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)} // Nulstiller og lukker
        table={table}
        onRefresh={fetchItems} // Sørger for automatisk opdatering af listen
      />
    </>
  );
}
