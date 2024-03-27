import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "../interface/pokemon";

const useGetPokemon = (id: number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokebuildapi.fr/api/v1/pokemon/${id}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  return { pokemon, loading };
};

export default useGetPokemon;
