import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('Stored user:', JSON.parse(storedUser)); // Agregar el console.log aquí
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User logged in:', userData); // Agregar el console.log aquí
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sessions/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem('user');
      } else {
        throw new Error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
