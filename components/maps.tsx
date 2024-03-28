import React, { useEffect, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Pokemon } from "../interface/pokemon";
import DetailsPokemon from "./modal-detail-pokemon";

export default function MapsPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState("");

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

  const handleMarkerPress = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon.id.toString());
    setModalVisible(true);
  };

  const generateRandomMarkers = (number: number) => {
    let markers = [];
    const centerLat = 45.757651438081304;
    const centerLng = 4.831978772436521;
    const latDelta = 0.0922;
    const lngDelta = 0.0421;

    for (let i = 0; i < number; i++) {
      const lat = centerLat + (Math.random() - 0.5) * latDelta;
      const lng = centerLng + (Math.random() - 0.5) * lngDelta;
      const randomPokemonIndex = Math.floor(Math.random() * pokemon.length);
      markers.push({
        latitude: lat,
        longitude: lng,
        key: i,
        pokemon: pokemon[randomPokemonIndex],
      });
    }

    return markers;
  };

  const randomMarkers = pokemon.length > 0 ? generateRandomMarkers(5) : [];
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 46.2276,
          longitude: 2.2137,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
      >
        {randomMarkers.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleMarkerPress(marker.pokemon)}
          >
            {marker.pokemon && (
              <Image
                source={{ uri: marker.pokemon.image }}
                style={styles.markerStyle}
              />
            )}
          </Marker>
        ))}
      </MapView>
      {selectedPokemon && (
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
              <DetailsPokemon id={selectedPokemon} />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  markerStyle: {
    width: 50,
    height: 50,
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
