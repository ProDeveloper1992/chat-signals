import moment from 'moment';
import { Dimensions, Platform } from 'react-native';

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