import { useCallback, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import EditModal from "./EditModal";
import { supabase } from "../supabaseClient";
import emptyState from "../assets/ikoner/shoppinglist-passive-icon.svg";

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
      {loading && <p className="list-loading">Indlæser...</p>}
      {error && <p className="list-error">Fejl: {error.message}</p>}

      {!loading && items.length === 0 && (
        <div className="empty-list-container">
          <div className="empty-list-icon"> <img src={emptyState} alt="Tom indkøbsliste" className="empty-list-svg"/></div>
          <h3 className="empty-list-title">Din indkøbsliste er tom...</h3>
          <p className="empty-list-text">
            Du har ikke tilføjet nogen ingredienser endnu. Gå til Opdag for
            at finde nye opskrifter og ingredienser.
          </p>
        </div>
      )}

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
                    onClick={() => setSelectedItem(item)}
                  >
                    <span>{item.standard_mængde}</span>
                    <span>{item.enhed}</span>
                    <span>{item.navn}</span>

                    {showPrice && (
                      <span className="pris">
                        {Number(item.pris ?? 0).toLocaleString("da-DK", {})} kr
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
