import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CalendarScreen from './screens/CalendarScreen.js';
import FeedScreen from './screens/FeedScreen.js';
import MapScreen from './screens/MapScreen.js';
import MessangerScreen from './screens/MessangerScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import { StatusBar } from 'expo-status-bar'

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const AuthStack = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="AuthScreen" component={AuthScreen} />
//         </Stack.Navigator>
//     );
// };

const Navigaton = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Карта" component={MapScreen} />
                <Tab.Screen name="Лента" component={FeedScreen} />
                <Tab.Screen name="Календарь" component={CalendarScreen} />
                <Tab.Screen name="Чаты" component={MessangerScreen} />
                <Tab.Screen name="Профиль" component={ProfileScreen} />
            </Tab.Navigator>
			<StatusBar theme="auto"></StatusBar>
        </NavigationContainer>
    );
};

// const Navigation = ({ isAuthenticated, setAuthenticated }) => {
//     React.useEffect(() => {
//         const isUserAuthenticated = false;

//         if (isUserAuthenticated) {
//             setAuthenticated(true);
//         }
//     }, [setAuthenticated]);

//     return (
//         <NavigationContainer>
//             {!isAuthenticated ? <AuthStack /> : <AppNavigator />}
//         </NavigationContainer>
//     );
// };

// const mapStateToProps = (state) => ({
//     isAuthenticated: state.isAuthenticated,
// });
// const mapDispatchToProps = { setAuthenticated };

// export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

export default Navigaton;
