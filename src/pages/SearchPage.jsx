import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { supabase } from "../supabaseClient";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      const { data, error } = await supabase
        .from("ingredienser")
        .select("id, navn")
        .ilike("navn", `${query}%`)
        .order("navn", { ascending: true })
        .limit(8);

      if (error) {
        console.error(error);
        setSuggestions([]);
        return;
      }

      setSuggestions(data ?? []);
    };

    fetchSuggestions();
  }, [query]);

  return (
    <>
      <header>
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </header>

      <main>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((item) => (
              <li key={item.id}>{item.navn}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
