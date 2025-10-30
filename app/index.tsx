import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '@/components/Input';
import { Link } from 'expo-router';

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  //verifica que estemos poniendo un email valido
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!text.includes('@')) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  //verifica que la contraseña sea mayor a 6 caracteres
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    console.log('Login', { email, password });
  };

  //parte que se vera en el celu (login)
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Inicio de Sesión</Text>

        <Input
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Ingrese su email"
          error={emailError}
        />

        <Input
          label="Contraseña"
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          error={passwordError}
        />

        <TouchableOpacity
          style={[
            styles.button,
            (emailError || passwordError || !email || !password) && styles.buttonDisabled,
          ]}
          disabled={!!emailError || !!passwordError || !email || !password}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Link href="/RegisterScreen" style={styles.linkText}>
          ¿No tenés cuenta? Registrate
        </Link>
      </View>
    </View>
  );
}

//estilos del formulario
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
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
});
