import { Dimensions } from 'react-native';

export const Colors = {
  ui_primary: '#31C9DD',
  ui_primary_dark: '#3c8e92',
  ui_primary_10: 'rgba(49, 201, 221, 0.1)',
  ui_background: '#F2F4F5',
  white: '#FFFFFF',
  white_80: 'rgba(255,255,255,0.8)',
  black: '#0F2937',
  black_30: 'rgba(0,0,0,0.3)',
  green: 'green',
  red: '#FF3A44',
  golden: "#FFC300",
  positive: '#1D8348',
  ui_error: '#B22222',
  google: '#db4a39',
  facebook: '#3b5998',
  grey: '#E2E4E6',
  greydark: '#798992',
  grey_light: '#F0F0F6',
  gradient_1: '#6debef',
  gradient_2: '#52b8bc',
  gradient_3: '#3c8e92',
  gradient_4: '#337277',
  gradient_5: '#1d4044',
  transparent: 'transparent',
  ui_user_active: "#50DE8B",
  ui_user_away: "#FFB649",
  ui_counter_badge_gradient_1: '#FF4F81',
  ui_counter_badge_gradient_2: '#FF4265',
};

export const Images = {
  login_bg_2: require('../assets/images/login_bg2.jpg'),
  app_logo: require('../assets/images/app_logo.png'),
  forgot_heart_logo: require('../assets/images/heart_logo.png'),
  app_bg: require('../assets/images/app_bg.png'),
  landing_intro: require('../assets/images/landing_intro.png'),
};

export const Icons = {
  notification: require('../assets/icons/notification.png'),
  home: require('../assets/icons/home.png'),
  chat: require('../assets/icons/chat.png'),
  dollar_circle: require('../assets/icons/dollar_circle.png'),
  icon_languages: require('../assets/icons/languages.png'),
};

export const Gifs = {
  chat_signal_logo: require('../assets/gifs/chat-signal-logo.gif'),
}

export const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
export const SCREEN_WIDTH = width < height ? width : height;
export const SCREEN_HEIGHT = height > width ? height : width;

//Default Image
export const DEFAULT_IMAGE_URL = 'https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg';
export const DEFAULT_AVATAR_URL = 'https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg';
