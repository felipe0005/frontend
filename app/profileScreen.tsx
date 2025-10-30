// ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No hay usuario logueado</Text>
      </View>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'administrador':
        return '#ef4444';
      case 'profesor':
        return '#f59e0b';
      case 'estudiante':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'administrador':
        return 'Tienes acceso completo al sistema para gestionar eventos y usuarios.';
      case 'profesor':
        return 'Puedes crear eventos y gestionar tus propios eventos.';
      case 'estudiante':
        return 'Puedes inscribirte en eventos y ver tus inscripciones.';
      default:
        return '';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: getRoleColor(user.role) }]}>
          <Text style={styles.avatarText}>
            {user.nombre[0]}
            {user.apellido[0]}
          </Text>
        </View>
        <Text style={styles.name}>
          {user.nombre} {user.apellido}
        </Text>
        <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
          <Text style={styles.roleBadgeText}>{user.role.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>

          {user.carrera && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Carrera:</Text>
              <Text style={styles.infoValue}>{user.carrera}</Text>
            </View>
          )}

          {user.departamento && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Departamento:</Text>
              <Text style={styles.infoValue}>{user.departamento}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permisos y Accesos</Text>
        <View style={styles.permissionsCard}>
          <Text style={styles.roleDescription}>{getRoleDescription(user.role)}</Text>

          <View style={styles.permissionsList}>
            {user.role === 'administrador' && (
              <>
                <Text style={styles.permissionItem}>• Gestionar todos los eventos</Text>
                <Text style={styles.permissionItem}>• Gestionar usuarios</Text>
                <Text style={styles.permissionItem}>• Crear eventos</Text>
                <Text style={styles.permissionItem}>• Ver reportes</Text>
              </>
            )}
            {user.role === 'profesor' && (
              <>
                <Text style={styles.permissionItem}>• Crear eventos</Text>
                <Text style={styles.permissionItem}>• Gestionar mis eventos</Text>
                <Text style={styles.permissionItem}>• Ver asistentes</Text>
                <Text style={styles.permissionItem}>• Inscribirse en eventos</Text>
              </>
            )}
            {user.role === 'estudiante' && (
              <>
                <Text style={styles.permissionItem}>• Inscribirse en eventos</Text>
                <Text style={styles.permissionItem}>• Ver mis inscripciones</Text>
                <Text style={styles.permissionItem}>• Ver detalles de eventos</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Eventos Inscrito</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Eventos Completados</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Próximos Eventos</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  permissionsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roleDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  permissionsList: {
    gap: 8,
  },
  permissionItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
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
});
