import { Platform, StyleSheet } from 'react-native';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';

const listColums = 1;
const listRows = 3.5;
const listItemMargin = 20;
const listItemWidth =
  (SCREEN_WIDTH - (listColums + 1) * listItemMargin);
const listItemHeight =
  (SCREEN_HEIGHT - (listRows + 1) * listItemMargin) / listRows;

export default StyleSheet.create({
  listItemContainer: {
    flex: 1,
    // marginLeft: listItemMargin,
    marginTop: 20,
    // width: listItemWidth / 2,
    height: listItemHeight,
    backgroundColor: Colors.grey,
    borderRadius: 20,
    margin: 8
  },
  onlineStatusText: { color: Colors.black, fontSize: 12 },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 5,
    paddingHorizontal: 15,
    alignItems: 'flex-start'
  },
  popupContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "rgba(15, 41, 55, 0.75)",
  },
  bookmarkedContainer: {
    backgroundColor: Colors.white_80,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginStart: 5,
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.ui_primary_dark,
  },
  flagIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  userName: {
    flex: 1,
    textTransform: 'capitalize',
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginEnd: 10
  }
});
