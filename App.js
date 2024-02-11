import React, { Suspense } from 'react';
import { View } from'react-native';
import NavigationLayout from './Navigation';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen.js'

const Stack = createNativeStackNavigator();

export default function App() {
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log('user', user);
  //     setUser(user);
  //   });
  // }, []);
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreen'>
          <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
        // <NavigationLayout /> 
        // <NavigationContainer>
        //   <Stack.Navigator initialRouteName="LoginScreen">
        //     {user ? (
        //       <>
        //         <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        //       </>
        //     ) : (
        //       <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        //     )}
            
        //   </Stack.Navigator>
        // </ NavigationContainer>
    //     <Provider store={store}>
    //     <PersistGate loading={null} persistor={persistor}>
    //     <NavigationContainer>
    //       <Stack.Navigator initialRouteName="LoginScreen">
    //         {user ? (
    //           <Stack.Screen name="TabNavigator" component={NavigatonInside} options={{ headerShown: false }} />
    //         ) : (
    //           <Stack.Screen name="LoginScreen" component={LoginScreen}/>
    //         )}
            
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </PersistGate>
    // </Provider>
    );
}
