import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  cardContainer: {
    margin: 11,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: Colors.ui_primary,
    borderRadius: 5,
    marginTop: 10
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: Colors.grey,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  commonIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  tabViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Colors.grey,
  },

  tabView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },

  centerTabView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: Colors.grey,
  },

  editPenContainer: {
    height: 27,
    width: 27,
    borderRadius: 27 / 2,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  boostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 46
  },

  boostIconContainer: {
    marginBottom: -10,
    marginStart: -10
  }
});
