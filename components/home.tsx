import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Pokemon } from "../interface/pokemon";

export default function Home({ navigation }: { navigation: any }) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokebuildapi.fr/api/v1/pokemon/limit/1"
      );
      const data = await response.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, []);

  return (
    <View style={styles.container}>
      {pokemon.map((poke, index) => (
        <View>
          <View key={index}>
            <Image
              source={{ uri: poke.image }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{poke.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
