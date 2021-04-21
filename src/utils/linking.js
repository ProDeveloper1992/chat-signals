import { Linking } from "react-native";

const config = {
    screens: {
        'app-loading-screen': {
            path: "loading"
        },
        'main-stack': {
            path: "main",
        },
        'auth-stack': {
            path: "auth",
        },
        'Login': {
            path: 'login'
        },
        'Landing': {
            path: 'landing'
        },
        'RegisterWithEmail': {
            path: 'register'
        },
        'NotificationTabStack': {
            path: 'notifications'
        },
        'ChatTabStack': {
            path: 'chats'
        },
        'BuyCoinsTabStack': {
            path: 'buycoins'
        },
        'UserProfileTabStack': {
            path: 'userprofile'
        },
    },
};

const linking = {
    prefixes: ["chatsignal://app"],
    config,
};

export default linking;