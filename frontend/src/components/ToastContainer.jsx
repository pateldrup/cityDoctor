import React from 'react';
import { useNotifications } from '../context/NotificationContext';

const ToastItem = ({ toast, removeToast }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '14px',
      padding: '14px 18px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
      borderLeft: '4px solid #2ECC71',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      animation: 'toastSlideIn 0.3s ease',
      minWidth: '300px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <span style={{ fontSize: '24px' }}>{toast.icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 700, fontSize: '14px', margin: 0 }}>{toast.title}</p>
        <p style={{ fontSize: '13px', color: '#666', margin: '2px 0 0' }}>{toast.message}</p>
      </div>
      <button 
        onClick={() => removeToast(toast.toastId)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#999', padding: '0 4px' }}
      >
        ×
      </button>
      
      {/* Progress Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '3px',
        background: '#2ECC71',
        animation: 'progressShrink 4s linear forwards',
      }}/>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '360px',
    }}>
      {toasts.map(toast => (
        <ToastItem key={toast.toastId} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
