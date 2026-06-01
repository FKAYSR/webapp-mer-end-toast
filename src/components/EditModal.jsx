import { useRef, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function EditModal({ item, onClose, table, onRefresh }) {
  const dialogRef = useRef(null);

  const [afdelinger, setAfdelinger] = useState([]);

  // Åbn/luk modal
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (item) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [item]);

  // Hent ALLE afdelinger fra hele ingrediens-tabellen (ikke filtreret liste)
  useEffect(() => {
    async function hentAlleAfdelinger() {
      try {
        const { data, error } = await supabase
          .from("ingredienser") // 👈 vigtigt: fast tabel
          .select("afdeling");

        if (error) throw error;

        const råAfdelinger = data
          .map((d) => (d.afdeling ? d.afdeling.trim() : null))
          .filter(Boolean);

        const unikke = [...new Set(råAfdelinger)];
        unikke.sort((a, b) => a.localeCompare(b, "da"));

        setAfdelinger(unikke);
      } catch (err) {
        console.error("Kunne ikke hente afdelinger:", err.message);
      }
    }

    if (item) {
      hentAlleAfdelinger();
    }
  }, [item]);

  if (!item) return null;

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const opdatedMængde = formData.get("mængde");
    const opdatedAfdeling = formData.get("afdeling");

    try {
      const { error } = await supabase
        .from(table)
        .update({
          standard_mængde: opdatedMængde,
          afdeling: opdatedAfdeling,
        })
        .eq("id", item.id);

      if (error) throw error;

      onRefresh();
      onClose();
    } catch (err) {
      console.error("Der skete en fejl under opdateringen:", err.message);
      alert("Kunne ikke opdatere varen. Prøv igen.");
    }
  };

  // DELETE / REMOVE
  const handleDelete = () => {
    if (
      !window.confirm(
        `Er du sikker på, at du vil fjerne ${item.navn} fra indkøbslisten?`,
      )
    )
      return;

    async function removeIngredient() {
      try {
        if (item.kalorier_kcal === null || item.kalorier_kcal === undefined) {
          const { error } = await supabase
            .from(table)
            .delete()
            .eq("id", item.id);

          if (error) throw error;
        } else {
          const { error } = await supabase
            .from(table)
            .update({ added_to_list: false })
            .eq("id", item.id);

          if (error) throw error;
        }

        onRefresh();
        onClose();
      } catch (error) {
        console.error("Fejl ved fjernelse af vare:", error.message);
        alert("Der skete en fejl. Prøv igen.");
      }
    }

    removeIngredient();
  };

  return (
    <dialog ref={dialogRef} onClose={onClose} className="crud-modal">
      <div className="modal-content">
        <h2>Rediger {item.navn}</h2>

        <form onSubmit={handleUpdate}>
          <label>
            Mængde:
            <input
              type="number"
              name="mængde"
              defaultValue={item.standard_mængde}
              required
            />
          </label>

          <label>
            Afdeling:
            <select
              name="afdeling"
              defaultValue={item.afdeling ?? "Ukendt afdeling"}
            >
              {afdelinger.map((afdelingNavn) => (
                <option key={afdelingNavn} value={afdelingNavn}>
                  {afdelingNavn}
                </option>
              ))}

              {/* fallback hvis værdien ikke findes i listen */}
              {item.afdeling && !afdelinger.includes(item.afdeling) && (
                <option value={item.afdeling}>{item.afdeling}</option>
              )}
            </select>
          </label>

          <div
            className="modal-actions"
            style={{ display: "flex", gap: "10px", marginTop: "20px" }}
          >
            <button
              type="button"
              onClick={handleDelete}
              style={{
                color: "white",
                backgroundColor: "#dc3545",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "auto",
              }}
            >
              Fjern fra liste
            </button>

            <button type="button" onClick={onClose}>
              Annuller
            </button>

            <button type="submit">Gem ændringer</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
