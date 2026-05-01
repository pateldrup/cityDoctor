import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const getTypeColor = (type) => ({
  appointment: '#e8f5e9',
  reminder: '#fff3e0',
  promo: '#e3f2fd',
  emergency: '#ffebee',
  review: '#fce4ec',
  system: '#f3e5f5',
}[type] || '#f5f5f5');

const NotificationItem = ({ notif, markAsRead, deleteNotification, navigate }) => (
  <div
    onClick={() => { markAsRead(notif.id); navigate(notif.actionUrl); }}
    style={{
      padding: '20px 24px',
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      background: notif.isRead ? 'white' : '#f0faf4',
      borderLeft: notif.isRead ? '4px solid transparent' : '4px solid #2ECC71',
      borderBottom: '1px solid #f0f0f0',
      cursor: 'pointer',
      transition: 'background 0.2s',
      width: '100%'
    }}
  >
    {/* Icon circle */}
    <div style={{
      width: '48px', height: '48px',
      borderRadius: '50%',
      background: getTypeColor(notif.type),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '24px', flexShrink: 0,
    }}>
      {notif.icon}
    </div>

    {/* Content */}
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontWeight: notif.isRead ? 500 : 700, fontSize: '16px', margin: 0, color: '#0D2B1A' }}>
          {notif.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '12px', color: '#999' }}>{notif.time}</span>
          <button
            onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '20px', padding: 0 }}
          >
            ×
          </button>
        </div>
      </div>
      <p style={{ fontSize: '14px', color: '#666', margin: '4px 0', lineHeight: '1.5' }}>
        {notif.message}
      </p>
      <div style={{ marginTop: '12px' }}>
        <button
          style={{
            background: 'none', border: '1px solid #2ECC71', color: '#1A6B3C',
            padding: '6px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {notif.actionLabel}
        </button>
      </div>
    </div>
  </div>
);

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const [activeTab, setActiveTab] = useState('All');
  
  // Settings state
  const [settings, setSettings] = useState({
    appointments: true,
    reminders: true,
    offers: false,
    emergency: true,
    reviews: true,
    email: true,
    sms: false
  });

  const toggleSetting = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const filterTabs = [
    { id: 'All', label: 'All' },
    { id: 'Unread', label: 'Unread' },
    { id: 'appointment', label: '📅 Appointments' },
    { id: 'reminder', label: '⏰ Reminders' },
    { id: 'promo', label: '🎉 Offers' },
    { id: 'emergency', label: '🚨 Alerts' },
    { id: 'review', label: '⭐ Reviews' },
    { id: 'system', label: '⚙️ System' }
  ];

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return !notif.isRead;
    return notif.type === activeTab;
  });

  // Group by date (simplified simulation based on timestamp)
  const grouped = {
    'Today': [],
    'Yesterday': [],
    'This Week': [],
    'Older': []
  };

  const now = new Date();
  filteredNotifications.forEach(notif => {
    const diffTime = Math.abs(now - new Date(notif.timestamp));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) grouped['Today'].push(notif);
    else if (diffDays === 2) grouped['Yesterday'].push(notif);
    else if (diffDays <= 7) grouped['This Week'].push(notif);
    else grouped['Older'].push(notif);
  });

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', color: '#0D2B1A', fontWeight: 800 }} className="font-display">
              🔔 All Notifications
            </h1>
            <span style={{
              background: '#e8f5e9', color: '#1A6B3C', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600
            }}>
              {unreadCount} unread
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={markAllAsRead} style={{ background: 'white', border: '1px solid #e0e0e0', padding: '10px 20px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>
              ✓ Mark All Read
            </button>
            <button onClick={clearAll} style={{ background: '#fff0f0', border: '1px solid #ffd6d6', color: '#E74C3C', padding: '10px 20px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Clear All
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }} className="scrollbar-hide">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '24px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: activeTab === tab.id ? '#2ECC71' : 'white',
                color: activeTab === tab.id ? 'white' : '#666',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(46,204,113,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔕</div>
              <p style={{ fontWeight: 700, color: '#333', fontSize: '20px', margin: '0 0 8px 0' }}>No notifications found</p>
              <p style={{ color: '#999', fontSize: '16px', margin: 0 }}>You're all caught up in this category!</p>
            </div>
          ) : (
            Object.entries(grouped).map(([groupName, items]) => {
              if (items.length === 0) return null;
              return (
                <div key={groupName}>
                  <div style={{ padding: '16px 24px', background: '#fafafa', borderBottom: '1px solid #f0f0f0', borderTop: '1px solid #f0f0f0' }}>
                    <h3 style={{ margin: 0, fontSize: '14px', color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {groupName}
                    </h3>
                  </div>
                  {items.map(notif => (
                    <NotificationItem 
                      key={notif.id} 
                      notif={notif} 
                      markAsRead={markAsRead} 
                      deleteNotification={deleteNotification}
                      navigate={navigate}
                    />
                  ))}
                </div>
              );
            })
          )}
        </div>

        {/* Settings Section */}
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e0e0e0', padding: '32px', marginTop: '16px' }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 24px 0', color: '#0D2B1A', fontWeight: 700 }}>
            Notification Preferences ⚙️
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            
            {[
              { id: 'appointments', label: '📅 Appointment Reminders' },
              { id: 'reminders', label: '⏰ Pre-visit Reminders' },
              { id: 'offers', label: '🎉 Offers & Promotions' },
              { id: 'emergency', label: '🚨 Emergency Alerts' },
              { id: 'reviews', label: '⭐ Review Requests' },
              { id: 'email', label: '📧 Email Notifications' },
              { id: 'sms', label: '📱 SMS Notifications' }
            ].map(setting => (
              <div key={setting.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#333' }}>{setting.label}</span>
                <button
                  onClick={() => toggleSetting(setting.id)}
                  style={{
                    width: '48px', height: '24px', borderRadius: '12px',
                    background: settings[setting.id] ? '#2ECC71' : '#e0e0e0',
                    border: 'none', cursor: 'pointer', position: 'relative',
                    transition: 'background 0.3s'
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px', background: 'white', borderRadius: '50%',
                    position: 'absolute', top: '2px', left: settings[setting.id] ? '26px' : '2px',
                    transition: 'left 0.3s'
                  }} />
                </button>
              </div>
            ))}
            
          </div>
          <div style={{ marginTop: '32px', borderTop: '1px solid #f0f0f0', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{
              background: '#2ECC71', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, fontSize: '16px', border: 'none', cursor: 'pointer'
            }}>
              Save Preferences
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default NotificationsPage;
