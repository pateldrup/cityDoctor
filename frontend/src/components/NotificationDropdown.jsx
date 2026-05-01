import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

const getTypeColor = (type) => ({
  appointment: '#e8f5e9',
  reminder: '#fff3e0',
  promo: '#e3f2fd',
  emergency: '#ffebee',
  review: '#fce4ec',
  system: '#f3e5f5',
}[type] || '#f5f5f5');

export const NotificationDropdown = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const [activeTab, setActiveTab] = useState('All');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return !notif.isRead;
    if (activeTab === 'Appointments') return notif.type === 'appointment' || notif.type === 'reminder';
    if (activeTab === 'Alerts') return notif.type === 'emergency' || notif.type === 'system';
    return true;
  });

  return (
    <div ref={dropdownRef} style={{
      position: 'absolute',
      top: '50px',
      right: '0',
      width: '380px',
      maxHeight: '520px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
      border: '1px solid #e8f5e9',
      zIndex: 9999,
      overflow: 'hidden',
      animation: 'dropdownSlideDown 0.2s ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1A6B3C, #2ECC71)',
      }}>
        <div>
          <h3 style={{ color: 'white', margin: 0, fontSize: '16px', fontWeight: 700 }}>
            🔔 Notifications
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '12px' }}>
            {unreadCount} unread messages
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          ✓ Mark all read
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', padding: '10px 20px', borderBottom: '1px solid #f0f0f0', gap: '8px', overflowX: 'auto' }}>
        {['All', 'Unread', 'Appointments', 'Alerts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === tab ? '#2ECC71' : '#f5f5f5',
              color: activeTab === tab ? 'white' : '#666',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ overflowY: 'auto', maxHeight: '360px', flex: 1 }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px' }}>🔕</div>
            <p style={{ fontWeight: 600, color: '#333' }}>No notifications</p>
            <p style={{ color: '#999', fontSize: '14px' }}>You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => { markAsRead(notif.id); navigate(notif.actionUrl); setIsOpen(false); }}
              style={{
                padding: '14px 20px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                background: notif.isRead ? 'white' : '#f0faf4',
                borderLeft: notif.isRead ? '3px solid transparent' : '3px solid #2ECC71',
                borderBottom: '1px solid #f5f5f5',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: '42px', height: '42px',
                borderRadius: '50%',
                background: getTypeColor(notif.type),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
              }}>
                {notif.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: notif.isRead ? 400 : 700, fontSize: '14px', margin: 0 }}>
                    {notif.title}
                  </p>
                  {/* Delete X button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '16px' }}
                  >
                    ×
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: '#666', margin: '2px 0' }}>
                  {notif.message}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#999' }}>{notif.time}</span>
                  <span style={{
                    fontSize: '11px', color: '#1A6B3C',
                    fontWeight: 600, cursor: 'pointer'
                  }}>
                    {notif.actionLabel} →
                  </span>
                </div>
              </div>

              {/* Unread blue dot */}
              {!notif.isRead && (
                <div style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  background: '#2ECC71',
                  flexShrink: 0, marginTop: '6px'
                }} />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <button onClick={() => { navigate('/notifications'); setIsOpen(false); }} style={{ background: 'none', border: 'none', color: '#1A6B3C', fontWeight: 600, cursor: 'pointer' }}>
          View All Notifications →
        </button>
        <button onClick={() => { clearAll(); setIsOpen(false); }} style={{ background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer', fontWeight: 600 }}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
