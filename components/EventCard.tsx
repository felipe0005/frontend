import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  onPress: (event: Event) => void;
  onRegister?: (eventId: string) => void;
  userRole?: string;
  isRegistered?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  onRegister,
  userRole = 'student',
  isRegistered = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('es-ES', { month: 'short' }),
      time: date.toLocaleString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    };
  };

  const { day, month, time } = formatDate(event.date_time);
  const attendeesCount = event.registrations?.count || 0;
  const isFull = attendeesCount >= event.max_attendees;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(event)} activeOpacity={0.7}>
      {/* Imagen del evento */}
      <View style={styles.imageContainer}>
        {event.image_url ? (
          <Image source={{ uri: event.image_url }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Evento</Text>
          </View>
        )}

        {/* Badge de fecha */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateMonth}>{month}</Text>
        </View>
      </View>

      {/* Contenido de la tarjeta */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.details}>
          <Text style={styles.location} numberOfLines={1}>
            📍 {event.location}
          </Text>
          <Text style={styles.time}>🕒 {time}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.attendees}>
            👥 {attendeesCount}/{event.max_attendees} asistentes
            {isFull && <Text style={styles.fullText}> • COMPLETO</Text>}
          </Text>

          {userRole === 'student' && onRegister && (
            <TouchableOpacity
              style={[
                styles.registerButton,
                (isRegistered || isFull) && styles.registerButtonDisabled,
              ]}
              disabled={isRegistered || isFull}
              onPress={() => onRegister(event.id)}>
              <Text style={styles.registerButtonText}>
                {isRegistered ? 'Inscrito' : isFull ? 'Completo' : 'Inscribirse'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 40,
  },
  dateDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  dateMonth: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  details: {
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendees: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  fullText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EventCard;
