import { Dimensions } from 'react-native';

export const Colors = {
  ui_primary: '#31C9DD',
  ui_primary_dark: '#3c8e92',
  ui_background: '#F2F4F5',
  white: '#FFFFFF',
  white_80: 'rgba(255,255,255,0.8)',
  black: '#0F2937',
  black_30: 'rgba(0,0,0,0.3)',
  green: 'green',
  red: '#CB4335',
  golden: "#FFC300",
  positive: '#1D8348',
  ui_error: '#B22222',
  google: '#db4a39',
  facebook: '#3b5998',
  grey: '#E2E4E6',
  greydark: '#798992',
  gradient_1: '#6debef',
  gradient_2: '#52b8bc',
  gradient_3: '#3c8e92',
  gradient_4: '#337277',
  gradient_5: '#1d4044',
  transparent: 'transparent',
  ui_user_active: "#50DE8B",
  ui_user_away: "#FFB649",
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
  search: require('../assets/icons/search.png'),
  user_profile: require('../assets/icons/user.png'),
  icon_languages: require('../assets/icons/languages.png'),
  bookmark: require('../assets/icons/bookmark.png'),
  back_icon: require('../assets/icons/back-icon.png'),
  like_icon: require('../assets/icons/like.png'),
  kiss_icon: require('../assets/icons/kiss.png'),
  add_friend_icon: require('../assets/icons/add-friend.png'),
  chat_flat_icon: require('../assets/icons/chat-icon.png'),
  right_arrow: require('../assets/icons/right-chevron-arrow.png'),
  facebook_icon: require('../assets/icons/facebook.png'),
  facebook_color_icon: require('../assets/icons/facebook_color.png'),
  google_icon: require('../assets/icons/google.png'),
  mail_icon: require('../assets/icons/mail.png'),
  heart_icon: require('../assets/icons/heart.png'),
  super_flirt_heart_icon: require('../assets/icons/super-flirt-heart.png'),
  coins_icon: require('../assets/icons/coins.png'),
  sticker_icon: require('../assets/icons/sticker.png'),
  add_image_icon: require('../assets/icons/add-Image.png'),
  send_icon: require('../assets/icons/send.png'),
  tick_icon: require('../assets/icons/tick_24.png'),
  double_tick_icon: require('../assets/icons/double_tick_24.png'),
  icon_emoji_happy: require('../assets/icons/emoji_happy.png'),
  icon_emoji_cool: require('../assets/icons/emoji_cool.png'),
  icon_emoji_love: require('../assets/icons/emoji_love.png'),
  icon_drop_down: require('../assets/icons/arrow_drop_down.png'),
  icon_drop_up: require('../assets/icons/arrow_drop_up.png'),
  icon_purchase_active: require('../assets/icons/purchase-active.png'),
  icon_purchase_inactive: require('../assets/icons/purchase-inactive.png'),
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
export const DEFAULT_AVATAR_URL = 'https://lh3.googleusercontent.com/proxy/HLYvJt-yzp9mc7cjrcnoCUhG3V_ILvrh8kwuApWZZuNhOTO3gVMf7NAWBTw1VqWLfD-1SYbvxD1w7M4LBNQlzMRVX-CFacs';
