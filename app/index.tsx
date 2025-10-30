// index.tsx
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Eventos Uni</Text>
        <Text style={styles.subtitle}>Sistema de Gestión Universitaria</Text>

        <View style={styles.buttonContainer}>
          <Link href="/LoginScreen" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/RegisterScreen" asChild>
            <TouchableOpacity style={styles.buttonRegister}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </Link>
        </View>
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
  main: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonRegister: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
