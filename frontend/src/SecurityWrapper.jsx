import React, { useEffect } from 'react';

const SecurityWrapper = ({ children, userRole }) => {
  useEffect(() => {
    if (userRole === 'faculty') return;

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // Disable Ctrl+S, Ctrl+P, Ctrl+U, Ctrl+Shift+I, F12, Ctrl+C (optional, but requested drag/content protection)
      const ctrlKey = e.ctrlKey || e.metaKey;
      
      // Ctrl+S (Save), Ctrl+P (Print)
      if (ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
        e.preventDefault();
      }

      // Ctrl+Shift+I (DevTools), Ctrl+Shift+J (DevTools), Ctrl+Shift+C (Inspect)
      if (ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
      }

      // F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
      }

      // PrintScreen (Attempt to block/warn)
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        alert('Screenshots are restricted on this platform. Please respect the content privacy.');
      }
    };

    const handleBlur = () => {
      document.body.classList.add('blurred-content');
    };

    const handleFocus = () => {
      document.body.classList.remove('blurred-content');
    };

/*
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
    */
  }, [userRole]);

  return (
    <div className={userRole === 'student' ? 'student-mode' : 'faculty-mode'}>
      {children}
    </div>
  );
};

export default SecurityWrapper;
