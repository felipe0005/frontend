// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login - en producción esto haría una llamada a la API
    try {
      // Aquí iría la lógica real de autenticación
      if (email && password) {
        const mockUser: User = {
          id: '1',
          email: email,
          nombre: 'Juan',
          apellido: 'Pérez',
          role: email.includes('admin')
            ? 'administrador'
            : email.includes('prof')
              ? 'profesor'
              : 'estudiante',
          carrera: email.includes('admin') ? undefined : 'Ingeniería',
          departamento: email.includes('prof') ? 'Departamento de Ciencias' : undefined,
        };
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    // Simulación de registro
    try {
      console.log('Registrando usuario:', userData);
      // Aquí iría la lógica real de registro
      return true;
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
