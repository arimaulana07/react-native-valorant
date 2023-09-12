import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
import Agents from './screens/agents';
import AppLoading from 'expo-app-loading';
import Weapons from './screens/weapons';
import WeaponDetail from './screens/weaponDetail';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const NavComponent = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1C252E', paddingTop: 35 },
        tabBarLabelStyle: { fontSize: 18, fontFamily: 'kanit-bold', letterSpacing: 0.8 },
        tabBarActiveTintColor: '#FF445A',
        tabBarInactiveTintColor: 'white',
        swipeEnabled: false,
        tabBarIndicatorStyle: { elevation: 0, width: 0, height: 0 }
      }}
    >
      <Tab.Screen name="AGENTS" component={Agents} />
      <Tab.Screen name="WEAPONS" component={Weapons} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'kanit': require('./assets/fonts/Kanit-Regular.ttf'),
    'kanit-bold': require('./assets/fonts/Kanit-Bold.ttf'),
    'kanit-exlight': require('./assets/fonts/Kanit-ExtraLight.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={NavComponent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WeaponDetail"
              component={WeaponDetail}
              options={
                {
                  presentation: 'modal',
                  title: 'WEAPON DETAILS',
                  headerStyle: { backgroundColor: '#1C252E' },
                  headerTitleStyle: { color: '#FF445A', fontFamily: 'kanit-bold' },
                  headerBackTitleStyle: { color: '#FF445A' },
                  headerTintColor: '#FF445A'
                }
              }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C252E',
    // paddingTop: 30
  },
});
