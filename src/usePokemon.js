import { useState, useEffect } from "react";

export function usePokemon(query) {
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    setStatus("pending");
    setError(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          return r.text().then(err => {
            throw new Error(err);
          });
        }
      })
      .then(data => {
        setPokemon(data);
        setStatus("fulfilled");
      })
      .catch(err => {
        setError(err.message);
        setStatus("rejected");
      });
  }, [query]);

  return { data: pokemon, status, error };
}
