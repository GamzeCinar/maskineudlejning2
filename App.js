import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Add_edit_Machine from './components/Add_edit_Machine';
import MachineDetails from './components/MachineDetails';
import MachineList from './components/MachineList';
import RentalHistory from './components/RentalHistory';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {
  // web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBqTqI3xHC0hkXg9_8MZ3ErzpyUjGn63Ws",
    authDomain: "maskineudlejningdb.firebaseapp.com",
    databaseURL: "https://maskineudlejningdb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "maskineudlejningdb",
    storageBucket: "maskineudlejningdb.appspot.com",
    messagingSenderId: "683380599197",
    appId: "1:683380599197:web:e54ed5f27b96256137e774"
  };

  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
    // Initialize other firebase products here
  }
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={'Machine List'} component={MachineList} />
        <Stack.Screen name={'Machine Details'} component={MachineDetails} />
        <Stack.Screen name={'Edit Machine'} component={Add_edit_Machine} />
        <Stack.Screen name={'Rental History'}>
          {props => (
            <RentalHistory {...props} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
  

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Home'} component={StackNavigation} options={{ tabBarIcon: () => (<Ionicons name="home" size={20} />), headerShown: null }} />
        <Tab.Screen name={'Add'} component={Add_edit_Machine} options={{ tabBarIcon: () => (<Ionicons name="add" size={20} />) }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});