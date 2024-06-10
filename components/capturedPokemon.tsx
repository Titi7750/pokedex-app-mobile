import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Pokemon } from "../interface/pokemon";

export default function CapturedPokemon() {
  const [capturedPokemon, setCapturedPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const loadCapturedPokemon = async () => {
      try {
        const capturedPokemon = await AsyncStorage.getItem("capturedPokemon");
        if (capturedPokemon) {
          setCapturedPokemon(JSON.parse(capturedPokemon));
        }
      } catch (error) {
        console.error("Error loading captured pokemon", error);
      }
    };

    loadCapturedPokemon();
  }, []);

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <View style={styles.pokemonCard}>
      <Image source={{ uri: item.image }} style={styles.imgPokemon} />
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={capturedPokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
        numColumns={2}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pokemonCard: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "orange",
  },

  imgPokemon: {
    width: 135,
    height: 135,
    marginTop: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
