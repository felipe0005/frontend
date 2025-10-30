import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '@/components/Input';
import Link from 'expo-router/link';
import { useState } from 'react';

export default function Register() {
  //creamos estados(variables reactivas) para los diferentes variables que usemos
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  //verificamos que el email sea email
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(text.includes('@') ? '' : 'Email inválido');
  };

  //verificamos que la contraseña sea mayor a 6 caracteres
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(text.length < 6 ? 'La contraseña debe tener al menos 6 caracteres' : '');
  };

  //verificamos que la contraseña se la misma que la anterior
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(text !== password ? 'Las contraseñas no coinciden' : '');
  };

  //parte visual de el registro (celular)
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Input
          label="Email"
          value={email}
          placeholder="Ingrese su email"
          onChangeText={handleEmailChange}
        />
        <Input
          label="Contraseña"
          value={password}
          placeholder="Ingrese una contraseña"
          onChangeText={handlePasswordChange}
        />
        <Input
          label="Contraseña"
          value={password}
          placeholder="Ingrese la contraseña otra vez"
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity
          style={[
            styles.button,
            (emailError ||
              passwordError ||
              confirmPasswordError ||
              !email ||
              !password ||
              !confirmPassword) &&
              styles.buttonDisabled,
          ]}
          disabled={
            !!emailError ||
            !!passwordError ||
            !!confirmPasswordError ||
            !email ||
            !password ||
            !confirmPassword
          }>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Link href="/LoginScreen">¿Ya tenés cuenta? Inicia sesión</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f6fc',
  },
  form: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#4f46e5',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
});
