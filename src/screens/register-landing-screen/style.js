import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
    marginEnd: 8,
  },
  input: {
    marginVertical: 8,
  },
  registerButtom: {
    paddingVertical: 12,
    marginVertical: 8,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
});
