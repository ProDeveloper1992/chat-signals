
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
};

export const configureFirebaseNotification = () => {
    if (requestUserPermission()) {
        /**
         * Returns an FCM token for this device
         */
        messaging()
            .getToken()
            .then((fcmToken) => {
                console.log('FCM Token -> ', fcmToken);
            });
    } else console.log('Not Authorization status:', authStatus);

    messaging().onMessage(
        async (remoteMessage) => {
            // alert('A new FCM message arrived!');
            console.log(
                'A new FCM message arrived!',
                JSON.stringify(remoteMessage)
            );
        }
    );

    /**
     * When a notification from FCM has triggered the application
     * to open from a quit state, this method will return a
     * `RemoteMessage` containing the notification data, or
     * `null` if the app was opened via another method.
     */
    messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    'getInitialNotification:' +
                    'Notification caused app to open from quit state',
                );
                console.log(remoteMessage);
                alert(
                    'getInitialNotification: Notification caused app to' +
                    ' open from quit state',
                );
            }
        });

    /**
     * When the user presses a notification displayed via FCM,
     * this listener will be called if the app has opened from
     * a background state. See `getInitialNotification` to see
     * how to watch for when a notification opens the app from
     * a quit state.
     */
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
        if (remoteMessage) {
            console.log(
                'onNotificationOpenedApp: ' +
                'Notification caused app to open from background state',
            );
            console.log(remoteMessage);
            alert(
                'onNotificationOpenedApp: Notification caused app to' +
                ' open from background state',
            );
        }
    });

    /**
     * Set a message handler function which is called when
     * the app is in the background or terminated. In Android,
     * a headless task is created, allowing you to access the
     * React Native environment to perform tasks such as updating
     * local storage, or sending a network request.
     */
    messaging().setBackgroundMessageHandler(
        async (remoteMessage) => {
            console.log(
                'Message handled in the background!',
                remoteMessage
            );
        });

    // triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
        console.log('[FCMService] new token refresh: ', fcmToken);
        // onRegister(fcmToken);
    });
}

export const configurePushNotification = () => {
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log('TOKEN:', token);
        },

        onRemoteFetch: function (data) {
            console.log("onRemoteFetch", data)
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            // if (notification.action == "ReplyInput") {
            //     console.log("reply_text", notification.reply_text);
            // } else {
            if (notification.userInteraction) {
                console.log("userInteraction", notification.userInteraction)
            } else {
                PushNotification.localNotification(notification);
            }

            // }

            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log('ACTION:', notification.action);
            console.log('NOTIFICATION:', notification);

            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });
}