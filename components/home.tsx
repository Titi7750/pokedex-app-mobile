import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pokemon } from "../interface/pokemon";
import DetailsPokemon from "./modal-detail-pokemon";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokebuildapi.fr/api/v1/pokemon/limit/10"
      );
      const data = await response.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {pokemon.map((pokemon) => (
          <TouchableOpacity
            key={pokemon.id}
            onPress={() => {
              setModalVisible(true);
              setSelectedPokemonId(pokemon.id.toString());
            }}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 120, height: 120 }}
              />
              <Text>{pokemon.name}</Text>
              <Image />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        {selectedPokemonId && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DetailsPokemon id={selectedPokemonId} />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Fermer</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    flexWrap: "wrap",
    flexDirection: "row",
  },

  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "orange",
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

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  imgPokemon: {
    width: 200,
    height: 200,
    marginTop: 20,
  },

  imgType: {
    width: 50,
    height: 50,
  },
});
