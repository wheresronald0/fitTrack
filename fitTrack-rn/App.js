import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function loginFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        options={{ title: "Sign Up!" }}
        component={SignupScreen}
      />
      <Stack.Screen
        name="SignIn"
        options={{ title: "Sign In" }}
        component={SigninScreen}
      />
    </Stack.Navigator>
  );
}

function mainFlow() {
  return (
    <Tab.Navigator>
      <Stack.Screen
        name="TrackList"
        options={{ title: "Your Tracks" }}
        component={TrackListScreen}
      />
      <Stack.Screen
        name="TrackDetail"
        options={{ title: "Track Detail" }}
        component={TrackDetailScreen}
      />
      <Stack.Screen
        name="Account"
        options={{ title: "Account" }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
  );
}

export default App;
