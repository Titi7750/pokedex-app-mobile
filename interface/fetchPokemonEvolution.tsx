import axios from "axios";

interface Evolution {
  id: number;
  name: string;
  image: string;
}

const useGetOnePokemonEvolutions = async (
  evolutionId: number
): Promise<Evolution> => {
  try {
    const evolutionResponse = await axios.get(
      `https://pokebuildapi.fr/api/v1/pokemon/${evolutionId}`
    );
    return evolutionResponse.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default useGetOnePokemonEvolutions;
