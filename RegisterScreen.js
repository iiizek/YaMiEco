import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Создаем объект auth с помощью getAuth()
const auth = getAuth();

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Используем createUserWithEmailAndPassword для регистрации пользователя
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Обработка успешной регистрации
        console.log('Пользователь успешно зарегистрирован:', userCredential.user.uid);
      })
      .catch((error) => {
        // Обработка ошибок регистрации
        console.error('Ошибка регистрации:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default RegisterScreen;
