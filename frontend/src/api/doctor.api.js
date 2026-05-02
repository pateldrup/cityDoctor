import api from './axiosConfig'

export const getDoctorsAPI = (params) => api.get('/doctors', { params })
export const getDoctorByIdAPI = (id) => api.get(`/doctors/${id}`)
export const getDoctorSlotsAPI = (id, date) => 
  api.get(`/doctors/${id}/slots`, { params: { date } })
