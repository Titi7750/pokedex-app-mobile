import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StrictMode } from "react";
import { TouchableOpacity } from "react-native";
import Home from "./components/home";
import CapturedPokemon from "./components/capturedPokemon";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Page d'accueil"
        component={Home}
        options={({ navigation }) => ({
          title: "Page des Pokémons",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Liste des Pokémons capturés")}
            >
              <FontAwesomeIcon icon={faCat} size={30} color={"orange"} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Liste des Pokémons capturés"
        component={CapturedPokemon}
        options={{
          title: "Liste des Pokémons capturés",
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
