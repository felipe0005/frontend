// HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/LoginScreen');
  };

  const getWelcomeMessage = () => {
    if (!user) return 'Bienvenido';

    switch (user.role) {
      case 'estudiante':
        return `Bienvenido estudiante ${user.nombre}`;
      case 'profesor':
        return `Bienvenido profesor ${user.nombre}`;
      case 'administrador':
        return `Bienvenido administrador ${user.nombre}`;
      default:
        return 'Bienvenido';
    }
  };

  const getRoleSpecificActions = () => {
    if (!user) return [];

    const commonActions = [
      { title: 'Ver Eventos', screen: 'EventListScreen' },
      { title: 'Mi Perfil', screen: 'ProfileScreen' },
    ];

    switch (user.role) {
      case 'estudiante':
        return [...commonActions, { title: 'Mis Inscripciones', screen: 'MyRegistrationsScreen' }];
      case 'profesor':
        return [
          ...commonActions,
          { title: 'Crear Evento', screen: 'CreateEventScreen' },
          { title: 'Mis Eventos', screen: 'MyEventsScreen' },
        ];
      case 'administrador':
        return [
          ...commonActions,
          { title: 'Crear Evento', screen: 'CreateEventScreen' },
          { title: 'Gestionar Eventos', screen: 'ManageEventsScreen' },
          { title: 'Gestionar Usuarios', screen: 'ManageUsersScreen' },
        ];
      default:
        return commonActions;
    }
  };

  const actions = getRoleSpecificActions();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>{getWelcomeMessage()}</Text>
        <Text style={styles.role}>Rol: {user?.role}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Acciones Disponibles</Text>

        <View style={styles.actionsGrid}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => router.push(`/${action.screen}` as any)}>
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estadísticas Rápidas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Eventos Activos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Mis Inscripciones</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Próximos Eventos</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#4f46e5',
    padding: 20,
    paddingTop: 60,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  role: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    minWidth: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
