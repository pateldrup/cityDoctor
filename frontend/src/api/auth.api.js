import api from './axiosConfig'

export const registerAPI = (data) => api.post('/auth/register', data)
export const loginAPI = (data) => api.post('/auth/login', data)
export const getMeAPI = () => api.get('/auth/me')
export const forgotPasswordAPI = (email) => api.post('/auth/forgot-password', { email })
export const resetPasswordAPI = (data) => api.post('/auth/reset-password', data)
export const googleAuthAPI = (data) => api.post('/auth/google', data)
