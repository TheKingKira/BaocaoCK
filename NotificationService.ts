import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification received:', notification);
  },
  requestPermissions: true,
});

export const scheduleNotification = (
  title: string,
  message: string,
  date: Date
): void => {
  PushNotification.localNotificationSchedule({
    title,
    message,
    date,
  });
};
