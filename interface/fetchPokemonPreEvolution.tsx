import axios from "axios";

interface PreEvolution {
  id: number;
  name: string;
  pokedexIdd: number;
  image: string;
}

const useGetOnePokemonPreEvolutions = async (
  prevEvolutionId: number
): Promise<PreEvolution> => {
  try {
    const pokemonPreEvolution = await axios.get(
      `https://pokebuildapi.fr/api/v1/pokemon/${prevEvolutionId}`
    );
    return pokemonPreEvolution.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default useGetOnePokemonPreEvolutions;
