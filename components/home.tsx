import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pokemon } from "../interface/pokemon";
import DetailsPokemon from "./modal-detail-pokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState("");
  const [isCaptured, setIsCaptured] = useState(false);

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

  const fetchMoreData = async () => {
    const response = await fetch(
      `https://pokebuildapi.fr/api/v1/pokemon/limit/${pokemon.length + 10}`
    );
    const data = await response.json();
    setPokemon(data);
  };

  // Check if a pokemon is captured
  const checkIfCaptured = async (id: string) => {
    try {
      const capturedPokemon = await AsyncStorage.getItem('capturedPokemon');
      if (capturedPokemon) {
        const capturedList = JSON.parse(capturedPokemon);
        return capturedList.some((p: Pokemon) => p.id.toString() === id);
      }
      return false;
    } catch (error) {
      console.error('Error checking if pokemon is captured', error);
      return false;
    }
  };

  const renderPokemon = ({ item }: { item: any }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          key={item.id}
          onPress={async () => {
            const captured = await checkIfCaptured(item.id.toString());
            setIsCaptured(captured);
            setModalVisible(true);
            setSelectedPokemonId(item.id.toString());
          }}
        >
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.imgPokemon}
            />
            <Text style={styles.namePokemon}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  };

  // Capture a pokemon
  const savePokemon = async (pokemon: Pokemon) => {
    try {
      const capturedPokemon = await AsyncStorage.getItem('capturedPokemon');
      let newCapturedPokemon = capturedPokemon ? JSON.parse(capturedPokemon) : [];
      newCapturedPokemon.push(pokemon);
      await AsyncStorage.setItem('capturedPokemon', JSON.stringify(newCapturedPokemon));
    } catch (error) {
      console.error('Error saving pokemon', error);
    }
  };

  // Release a pokemon
  const releasePokemon = async (pokemonId: string) => {
    try {
      const capturedPokemon = await AsyncStorage.getItem('capturedPokemon');
      if (capturedPokemon) {
        let newCapturedPokemon = JSON.parse(capturedPokemon);
        newCapturedPokemon = newCapturedPokemon.filter((p: Pokemon) => p.id.toString() !== pokemonId);
        await AsyncStorage.setItem('capturedPokemon', JSON.stringify(newCapturedPokemon));
      }
    } catch (error) {
      console.error('Error releasing pokemon', error);
    }
  };

  // Modal to show pokemon details
  const ModalDetailPokemon = () => {
    const handleCaptureRelease = () => {
      const selectedPokemon = pokemon.find(p => p.id.toString() === selectedPokemonId);
      if (selectedPokemon) {
        if (isCaptured) {
          releasePokemon(selectedPokemonId);
        } else {
          savePokemon(selectedPokemon);
        }
        setIsCaptured(!isCaptured);
        setModalVisible(!modalVisible);
      }
    };

    return (
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
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleCaptureRelease}
                >
                  <Text style={styles.textStyle}>{isCaptured ? 'Relâcher !' : 'Capturer !'}</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
        numColumns={2}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoader}
      />
      <ModalDetailPokemon />
    </View>
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

  imgPokemon: {
    width: 135,
    height: 135,
    marginTop: 20,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  namePokemon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
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

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
