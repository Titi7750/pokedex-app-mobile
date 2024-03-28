import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StrictMode } from "react";
import { TouchableOpacity } from "react-native";
import Home from "./components/home";
import MapsPokemon from "./components/maps";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapsPokemon"
        component={MapsPokemon}
        options={({ navigation }) => ({
          title: "Carte des Pokémons",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
            >
              <FontAwesomeIcon icon={faCat} size={30} color={"orange"} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Liste de mes Pokémons",
        }}
      />
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StrictMode>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </StrictMode>
  );
}
