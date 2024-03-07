export interface Pokemon {
  id: number;
  pokedexId: number;
  image: string;
  name: string;
  stats: {
    HP: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  apiTypes: {
    0: {
      name: string;
      image: string;
    };
    1: {
      name: string;
      image: string;
    };
  };
  apiGeneration: number;
  apiEvolutions: {
    0: {
      name: string;
      pokedexId: number;
    };
  };
  apiPreEvolution: {
    name: string;
    pokedexIdd: number;
  };
}
