import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
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
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Bienvenue sur PokeBuild",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MapsPokemon")}
            >
              <FontAwesomeIcon icon={faMapLocation} size={30} color={"orange"} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MapsPokemon"
        component={MapsPokemon}
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
