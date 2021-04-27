import moment from 'moment';
import { Dimensions, Platform } from 'react-native';
import { DEFAULT_AVATAR_URL } from '../constants';
import { store } from '../redux/store';

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRemainingTime(end, current) {
  var endTime = moment(end);
  var currentTime = moment(current);
  var remainingSeconds = endTime.diff(currentTime, "seconds");

  return remainingSeconds;
}

export const getFontFamily = (type) => {
  switch (type) {
    case 'regular':
      return 'Poppins-Regular';
    case 'medium':
      return 'Poppins-Medium';
    case 'bold':
      return 'Poppins-Bold';
    case 'heavy':
      return 'Poppins-Black';
    case 'light':
      return 'Poppins-Light';
    case 'bold-italic':
      return 'Poppins-BoldItalic';
    case 'black-italic':
      return 'Poppins-BlackItalic';
    default:
      return 'Poppins-Regular';
  }
};

export const getUserProfilePicture = () => {
  const { userData } = store.getState().userState;
  var profilePic = DEFAULT_AVATAR_URL;
  if (
    userData &&
    userData.profilepictures &&
    userData.profilepictures.length > 0
  ) {
    for (let profile of userData.profilepictures) {
      if (profile.picture_type == "1") {
        profilePic = profile.picture;
      }
    }
  }
  return profilePic;
};