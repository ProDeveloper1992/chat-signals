import { StyleSheet } from 'react-native';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';

const listColums = 2;
const listRows = 3.5;
const listItemMargin = 10;
const listItemWidth =
  (SCREEN_WIDTH - (listColums + 1) * listItemMargin) / listColums;
const listItemHeight =
  (SCREEN_HEIGHT - (listRows + 1) * listItemMargin) / listRows;

export default StyleSheet.create({
  listItemContainer: {
    flex: 1,
    marginLeft: listItemMargin,
    marginTop: 10,
    width: listItemWidth,
    height: listItemHeight,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    // justifyContent: 'flex-end',
  },
  onlineStatusSignal: function (isOnline) {
    return {
      height: 10,
      width: 10,
      borderRadius: 5,
      marginStart: 10,
      backgroundColor: isOnline ? Colors.ui_user_active : Colors.ui_user_active,
      // borderWidth: 2,
      // borderColor: Colors.white
    };
  },
  onlineStatusText: { color: Colors.black, fontSize: 12 },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(15, 41, 55, 0.75)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
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
});
