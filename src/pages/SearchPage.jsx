import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SearchInput from "../components/SearchInput";
import { supabase } from "../supabaseClient";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/produkter?query=${encodeURIComponent(query)}`);
  };

  const handleSuggestionClick = (navn) => {
    navigate(`/produkter?query=${encodeURIComponent(navn)}`);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <SearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </header>

      <main>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((item) => (
              <li key={item.id}>
                <button type="button" className="suggestion-button" onClick={() => handleSuggestionClick(item.navn)}>{item.navn}</button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
