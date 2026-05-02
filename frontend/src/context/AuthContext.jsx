import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // On app load → restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('citydoctor_user')
    const savedToken = localStorage.getItem('citydoctor_token')
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('citydoctor_user')
        localStorage.removeItem('citydoctor_token')
      }
    }
  }, [])

  const isLoggedIn = !!user

  // ─── SIGNUP ───────────────────────────────────────────
  const signup = async (userData) => {
    try {
      setIsLoading(true)

      // Get existing users from localStorage
      const existingUsers = JSON.parse(
        localStorage.getItem('citydoctor_users') || '[]'
      )

      // Check if email already exists
      const emailExists = existingUsers.find(
        u => u.email === userData.email
      )
      if (emailExists) {
        return {
          success: false,
          message: 'Email already registered. Please login.'
        }
      }

      // Check if phone already exists
      if (userData.phone) {
        const phoneExists = existingUsers.find(
          u => u.phone === userData.phone
        )
        if (phoneExists) {
          return {
            success: false,
            message: 'Phone number already registered.'
          }
        }
      }

      // Create new user
      const newUser = {
        id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        password: userData.password,
        userType: userData.userType || 'Traveler / Tourist',
        preferredLanguages: userData.preferredLanguages || userData.preferredLanguage || ['English'],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
        isEmailVerified: false,
        createdAt: new Date().toISOString(),
        savedDoctors: [],
        medicalInfo: {},
        emergencyContact: userData.emergencyContact || {},
        homeCity: userData.homeCity || ''
      }

      // Save to localStorage users list
      existingUsers.push(newUser)
      localStorage.setItem('citydoctor_users', JSON.stringify(existingUsers))

      // Create token
      const token = 'token_' + Date.now() + '_' + newUser.id

      // Save session (without password)
      const sessionUser = { ...newUser }
      delete sessionUser.password

      localStorage.setItem('citydoctor_token', token)
      localStorage.setItem('citydoctor_user', JSON.stringify(sessionUser))
      setUser(sessionUser)

      return { success: true, user: sessionUser }

    } catch (error) {
      return { success: false, message: 'Registration failed. Try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  // ─── LOGIN ────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      setIsLoading(true)

      if (!email || !password) {
        return { success: false, message: 'Please enter email and password' }
      }

      // Get all registered users
      const existingUsers = JSON.parse(
        localStorage.getItem('citydoctor_users') || '[]'
      )

      // Default test accounts
      const defaultAccounts = [
        {
          id: 'test_user_001',
          name: 'Test User',
          email: 'test@citydoctor.com',
          password: 'Test@123',
          userType: 'Traveler / Tourist',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TestUser',
          phone: '9876543210',
          preferredLanguages: ['English']
        },
        {
          id: 'rahul_user_001',
          name: 'Rahul Sharma',
          email: 'rahul@gmail.com',
          password: 'Test@123',
          userType: 'Traveler / Tourist',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RahulSharma',
          phone: '9876543211',
          preferredLanguages: ['English', 'Hindi']
        }
      ]

      const allUsers = [...existingUsers, ...defaultAccounts]

      // Find user by email
      const foundUser = allUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      )

      if (!foundUser) {
        return {
          success: false,
          message: 'No account found with this email. Please Sign Up first.'
        }
      }

      // Check password
      if (foundUser.password !== password) {
        return {
          success: false,
          message: 'Incorrect password. Please try again.'
        }
      }

      // Create token
      const token = 'token_' + Date.now() + '_' + foundUser.id

      // Save session (without password)
      const sessionUser = { ...foundUser }
      delete sessionUser.password

      localStorage.setItem('citydoctor_token', token)
      localStorage.setItem('citydoctor_user', JSON.stringify(sessionUser))
      setUser(sessionUser)

      return { success: true, user: sessionUser }

    } catch (error) {
      return { success: false, message: 'Login failed. Try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  // ─── LOGOUT ───────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('citydoctor_token')
    localStorage.removeItem('citydoctor_user')
    setUser(null)
    navigate('/')
  }

  // ─── GOOGLE LOGIN ─────────────────────────────────────
  const loginWithGoogle = async (googleData) => {
    try {
      setIsLoading(true)
      await new Promise(r => setTimeout(r, 1000))

      const existingUsers = JSON.parse(
        localStorage.getItem('citydoctor_users') || '[]'
      )

      let foundUser = existingUsers.find(u => u.email === googleData.email)

      if (!foundUser) {
        foundUser = {
          id: 'google_' + Date.now(),
          name: googleData.name,
          email: googleData.email,
          phone: '',
          password: 'GOOGLE_AUTH_' + Date.now(),
          userType: 'Traveler / Tourist',
          avatar: googleData.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(googleData.name)}`,
          loginMethod: 'google',
          preferredLanguages: ['English'],
          createdAt: new Date().toISOString(),
          savedDoctors: []
        }
        existingUsers.push(foundUser)
        localStorage.setItem('citydoctor_users', JSON.stringify(existingUsers))
      }

      const token = 'google_token_' + Date.now()
      const sessionUser = { ...foundUser }
      delete sessionUser.password

      localStorage.setItem('citydoctor_token', token)
      localStorage.setItem('citydoctor_user', JSON.stringify(sessionUser))
      setUser(sessionUser)

      return { success: true, user: sessionUser }

    } catch (error) {
      return { success: false, message: 'Google login failed' }
    } finally {
      setIsLoading(false)
    }
  }

  // ─── PHONE LOGIN ──────────────────────────────────────
  const loginWithPhone = async (phoneData) => {
    try {
      setIsLoading(true)
      await new Promise(r => setTimeout(r, 800))

      const existingUsers = JSON.parse(
        localStorage.getItem('citydoctor_users') || '[]'
      )

      let foundUser = existingUsers.find(u => u.phone === phoneData.phone)

      if (!foundUser) {
        foundUser = {
          id: 'phone_' + Date.now(),
          name: 'User ' + phoneData.phone.slice(-4),
          email: `phone_${phoneData.phone}@citydoctor.com`,
          phone: phoneData.phone,
          password: 'PHONE_AUTH_' + Date.now(),
          userType: 'Traveler / Tourist',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Phone${phoneData.phone}`,
          loginMethod: 'phone',
          preferredLanguages: ['English'],
          createdAt: new Date().toISOString(),
          savedDoctors: []
        }
        existingUsers.push(foundUser)
        localStorage.setItem('citydoctor_users', JSON.stringify(existingUsers))
      }

      const token = 'phone_token_' + Date.now()
      const sessionUser = { ...foundUser }
      delete sessionUser.password

      localStorage.setItem('citydoctor_token', token)
      localStorage.setItem('citydoctor_user', JSON.stringify(sessionUser))
      setUser(sessionUser)

      return { success: true, user: sessionUser }

    } catch (error) {
      return { success: false, message: 'Phone login failed' }
    } finally {
      setIsLoading(false)
    }
  }

  // ─── UPDATE PROFILE ───────────────────────────────────
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    localStorage.setItem('citydoctor_user', JSON.stringify(updatedUser))
    setUser(updatedUser)

    const existingUsers = JSON.parse(
      localStorage.getItem('citydoctor_users') || '[]'
    )
    const updatedUsers = existingUsers.map(u =>
      u.id === user.id ? { ...u, ...updatedData } : u
    )
    localStorage.setItem('citydoctor_users', JSON.stringify(updatedUsers))
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      isLoading,
      login,
      signup,
      logout,
      loginWithGoogle,
      loginWithPhone,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
