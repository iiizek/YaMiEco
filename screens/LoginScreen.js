import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Button } from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { ActivityIndicator } from 'react-native-paper';
import { signInWithEmailAndPassword, initializeAuth, getReactNativePersistence  } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    // const handleLogin = () => {
    //     // Your login logic here
    //     // ...
    
    //     // Navigate to the TabNavigator after successful login
    //     navigation.navigate('TabNavigator');
    //   };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput style={styles.input} value={email} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    placeholder="password"
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                ></TextInput>

                { loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <>
                        <Button title="Login" onPress={signIn} />
                        <Button title="Create account" onPress={signUp} />
                    </>
                    
                )}
          </KeyboardAvoidingView>
        </View>
      );
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});