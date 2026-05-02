import api from './axiosConfig'

export const createAppointmentAPI = (data) => api.post('/appointments', data)
export const getMyAppointmentsAPI = () => api.get('/appointments/my')
export const cancelAppointmentAPI = (id, reason) => 
  api.patch(`/appointments/${id}/cancel`, { reason })
