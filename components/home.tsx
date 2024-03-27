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

  const fetchMoreData = async () => {
    const response = await fetch(
      `https://pokebuildapi.fr/api/v1/pokemon/limit/${pokemon.length + 10}`
    );
    const data = await response.json();
    setPokemon(data);
  };

  const renderPokemon = ({ item }: { item: any }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            setModalVisible(true);
            setSelectedPokemonId(item.id.toString());
          }}
        >
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120 }}
            />
            <Text>{item.name}</Text>
            <Image />
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

  const ModalDetailPokemon = () => {
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

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
