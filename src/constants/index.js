import {Dimensions} from 'react-native';

export const Colors = {
  ui_primary: '#52b8bc',
  ui_primary_dark: '#3c8e92',
  white: '#ffffff',
  white_80: 'rgba(255,255,255,0.8)',
  black: '#1f191b',
  black_30: 'rgba(0,0,0,0.3)',
  green: 'green',
  red: '#CB4335',
  positive: '#98ff67',
  ui_error: '#B22222',
  google: '#db4a39',
  facebook: '#3b5998',
  grey: 'grey',
  greydark: '#4E586E',
  gradient_1: '#6debef',
  gradient_2: '#52b8bc',
  gradient_3: '#3c8e92',
  gradient_4: '#337277',
  gradient_5: '#1d4044',
};

export const Images = {
  login_bg_2: require('../assets/images/login_bg2.jpg'),
  app_logo: require('../assets/images/app_logo.png'),
  forgot_heart_logo: require('../assets/images/heart_logo.png'),
};

export const Icons = {
  home_active: require('../assets/icons/home-active.png'),
  home_inactive: require('../assets/icons/home-inactive.png'),
  chat_active: require('../assets/icons/chat-active.png'),
  chat_inactive: require('../assets/icons/chat-inactive.png'),
  coin_active: require('../assets/icons/coin-active.png'),
  coin_inactive: require('../assets/icons/coin-inactive.png'),
  group_active: require('../assets/icons/group-active.png'),
  group_inactive: require('../assets/icons/group-inactive.png'),
  user_profile: require('../assets/icons/search.png'),
  search: require('../assets/icons/user.png'),
  icon_languages: require('../assets/icons/languages.png'),
  bookmark: require('../assets/icons/bookmark.png'),
  back_icon: require('../assets/icons/back-icon.png'),
  like_icon: require('../assets/icons/like.png'),
  kiss_icon: require('../assets/icons/kiss.png'),
  add_friend_icon: require('../assets/icons/add-friend.png'),
  chat_flat_icon: require('../assets/icons/chat-icon.png'),
  right_arrow: require('../assets/icons/right-chevron-arrow.png'),
  facebook_icon: require('../assets/icons/facebook_24.png'),
  google_icon: require('../assets/icons/google.png'),
  heart_icon: require('../assets/icons/heart.png'),
  super_flirt_heart_icon: require('../assets/icons/super-flirt-heart.png'),
  coins_icon: require('../assets/icons/coins.png'),
  sticker_icon: require('../assets/icons/sticker.png'),
  add_image_icon: require('../assets/icons/add-Image.png'),
  send_icon: require('../assets/icons/send.png'),
  tick_icon: require('../assets/icons/tick_24.png'),
  double_tick_icon: require('../assets/icons/double_tick_24.png'),
};

export const Gifs = {
  chat_signal_logo: require('../assets/gifs/chat-signal-logo.gif'),
}

export const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// screen sizing
const {width, height} = Dimensions.get('window');
// orientation must fixed
export const SCREEN_WIDTH = width < height ? width : height;
export const SCREEN_HEIGHT = height > width ? height : width;
