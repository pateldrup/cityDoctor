import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('citydoctor_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        // Test account logic
        if (email === 'test@citydoctor.com' && password === 'Test@123') {
          const testUser = {
            id: '1',
            name: 'Test User',
            email: 'test@citydoctor.com',
            phone: '+919876543210',
            avatar: null,
            userType: 'Traveler / Tourist',
            preferredLanguage: ['English'],
            homeCity: 'Mumbai',
          };
          setUser(testUser);
          setIsLoggedIn(true);
          localStorage.setItem('citydoctor_user', JSON.stringify(testUser));
          resolve({ success: true });
        } else {
          // Check registered users in local storage
          const usersString = localStorage.getItem('citydoctor_users');
          const users = usersString ? JSON.parse(usersString) : [];
          const foundUser = users.find(u => u.email === email && u.password === password);
          
          if (foundUser) {
            // Do not store password in active session user object
            const { password, ...safeUser } = foundUser;
            setUser(safeUser);
            setIsLoggedIn(true);
            localStorage.setItem('citydoctor_user', JSON.stringify(safeUser));
            resolve({ success: true });
          } else {
            resolve({ success: false, message: 'Invalid email or password' });
          }
        }
      }, 1000);
    });
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const googleUser = {
          id: 'g_' + Math.random().toString(36).substr(2, 9),
          name: 'Google User',
          email: 'google@example.com',
          phone: '',
          avatar: null,
          userType: 'Traveler / Tourist',
          preferredLanguage: ['English'],
          homeCity: 'Current Location',
        };
        setUser(googleUser);
        setIsLoggedIn(true);
        localStorage.setItem('citydoctor_user', JSON.stringify(googleUser));
        setIsLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const signup = async (userData) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const usersString = localStorage.getItem('citydoctor_users');
        const users = usersString ? JSON.parse(usersString) : [];
        
        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
          setIsLoading(false);
          resolve({ success: false, message: 'Email already exists' });
          return;
        }

        const newUser = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
        };
        
        users.push(newUser);
        localStorage.setItem('citydoctor_users', JSON.stringify(users));
        
        // Log in the new user immediately
        const { password, ...safeUser } = newUser;
        setUser(safeUser);
        setIsLoggedIn(true);
        localStorage.setItem('citydoctor_user', JSON.stringify(safeUser));
        
        setIsLoading(false);
        resolve({ success: true });
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('citydoctor_user');
    window.location.href = '/'; // Using window.location to force full reload and redirect
  };

  const updateProfile = (data) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('citydoctor_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      isLoading,
      login,
      loginWithGoogle,
      signup,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
