import { createContext, useContext, useState, useEffect } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    // Mock initial notifications
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Confirmed!',
      message: 'Your appointment with Dr. Ananya Sharma is confirmed for Tomorrow 10:30 AM',
      time: '2 min ago',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      isRead: false,
      icon: '📅',
      actionUrl: '/bookings',
      actionLabel: 'View Booking',
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Rohan Mehta in 2 hours at Smile Dental Clinic',
      time: '1 hour ago',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: false,
      icon: '⏰',
      actionUrl: '/bookings',
      actionLabel: 'View Details',
    },
    {
      id: 3,
      type: 'promo',
      title: 'Special Offer 🎉',
      message: 'Get 20% off on your first video consultation. Use code: FIRST20',
      time: '3 hours ago',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: false,
      icon: '🏷️',
      actionUrl: '/find-doctor',
      actionLabel: 'Book Now',
    },
    {
      id: 4,
      type: 'emergency',
      title: 'Emergency Alert',
      message: 'High pollution advisory in your area. Keep medicines handy.',
      time: 'Yesterday',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      icon: '🚨',
      actionUrl: '/emergency',
      actionLabel: 'View Advisory',
    },
    {
      id: 5,
      type: 'review',
      title: 'Leave a Review',
      message: 'How was your consultation with Dr. Arjun Gupta? Share your experience.',
      time: '2 days ago',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isRead: true,
      icon: '⭐',
      actionUrl: '/bookings',
      actionLabel: 'Write Review',
    },
    {
      id: 6,
      type: 'system',
      title: 'Profile Incomplete',
      message: 'Add your emergency contact to complete your profile and stay safe while traveling.',
      time: '3 days ago',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isRead: true,
      icon: '👤',
      actionUrl: '/profile',
      actionLabel: 'Complete Profile',
    },
  ])

  const [toasts, setToasts] = useState([])

  // Unread count
  const unreadCount = notifications.filter(n => !n.isRead).length

  // Mark single as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  // Delete single notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Clear all notifications
  const clearAll = () => setNotifications([])

  // Add new notification (used when booking etc)
  const addNotification = (notification) => {
    const newNotif = {
      id: Date.now(),
      isRead: false,
      time: 'Just now',
      timestamp: new Date(),
      ...notification,
    }
    setNotifications(prev => [newNotif, ...prev])
    // Also show toast
    showToast(newNotif)
  }

  // Toast system
  const showToast = (notif) => {
    const toastId = Date.now()
    setToasts(prev => [...prev, { ...notif, toastId }])
    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.toastId !== toastId))
    }, 4000)
  }

  const removeToast = (toastId) => {
    setToasts(prev => prev.filter(t => t.toastId !== toastId))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        type: 'promo',
        title: 'Limited Time Offer! 🔥',
        message: 'Book a video consultation today and get ₹100 cashback!',
        icon: '💰',
        actionUrl: '/find-doctor',
        actionLabel: 'Book Now',
      })
    }, 30000) // 30 seconds after page load

    return () => clearTimeout(timer)
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      toasts,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll,
      addNotification,
      showToast,
      removeToast,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
