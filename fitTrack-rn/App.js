import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";

import { AuthProvider } from "./src/context/AuthContext";
import { LocationProvider } from "./src/context/LocationContext";

import { navigationRef } from "./src/components/RootNavigation";
import LoadingScreen from "./src/screens/LoadingScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function loginFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        options={{ title: "", headerShown: true }} //may keep empty string to see header for back navigation
        component={SignupScreen}
      />
      <Stack.Screen
        name="SignIn"
        options={{ title: "", headerShown: true }}
        component={SigninScreen}
      />
    </Stack.Navigator>
  );
}

//Bottom Nav Bar
function mainFlow(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Tracks") {
            iconName = focused ? "list-sharp" : "list-outline";
          } else if (route.name === "TrackCreate") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "settings" : "settings-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Stack.Screen
        name="Tracks"
        options={{ headerShown: false }}
        component={detailsOf}
      />
      <Stack.Screen
        name="TrackCreate"
        options={{ title: "Create Track" }}
        component={TrackCreateScreen}
      />
      <Stack.Screen
        name="Account"
        options={{ title: "Account" }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

function detailsOf(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrackList"
        options={{ title: "Your Tracks" }}
        component={TrackListScreen}
      />

      <Stack.Screen
        name="TrackDetail"
        //options={{ title: "Track Detail" }}
        component={TrackDetailScreen}
        options={{
          title: "Track Detailo",
          //tabBarItemStyle: { display: "none" },
          //headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <LocationProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen
              name="LoginFlow"
              component={loginFlow}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="MainFlow"
              component={mainFlow}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </LocationProvider>
  );
}

export default App;
