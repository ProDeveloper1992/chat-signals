import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  userDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }
});
