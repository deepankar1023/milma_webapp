// frontend/src/components/Notification.js
import React, { useEffect, useState } from 'react';
import { requestFirebaseNotificationPermission, onMessageListener } from '../firebase';
import { toast } from 'react-toastify';

const Notification = () => {
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        setToken(firebaseToken);
        console.log('Firebase token:', firebaseToken);
        // Save the token to your backend
      })
      .catch((err) => console.error(err));

    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
        toast.info(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
      })
      .catch((err) => console.error('Failed to receive message: ', err));
  }, []);

  return <div>Notification Component</div>;
};

export default Notification;
