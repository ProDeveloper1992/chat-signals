import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },

  imgBackground: {
    height: "100%",
    width: '100%',
    backgroundColor: Colors.grey
  },

  hrLine: {
    height: 0.3,
    backgroundColor: 'grey',
  },

  moderatorSwitchContainer: {
    flexDirection: 'row',
    marginStart: 10
  },

  moderatorNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  moderatorLocationContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },

  mRight: {
    marginRight: 10,
  },

  flagImage: {
    height: 16,
    width: 16,
    resizeMode: 'cover',
    alignSelf: 'center',
  },

  switchViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  moderatorIconViewHolder: {
    flexDirection: 'row',
    flex: 1,
  },

  tabViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.grey,
  },

  tabView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },

  centerTabView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: Colors.grey,
  },
  inactiveViewPaggerDot: function (pages) {
    return {
      width: Dimensions.get('window').width / (pages + (pages / 2)),
      height: 4,
      backgroundColor: 'rgba(255,255,255,0.4)'
    }
  },
  activeViewPaggerDot: function (pages) {
    return {
      width: Dimensions.get('window').width / (pages + (pages / 2)),
      height: 4,
      backgroundColor: Colors.white
    }
  },

  unlockEroticButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 46,
    paddingBottom: -10,
    paddingTop: -10,
    marginTop: 15
  },
  eroticContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
