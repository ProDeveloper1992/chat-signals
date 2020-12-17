import {StyleSheet} from 'react-native';
import {Colors, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';

const listColums = 2;
const listRows = 3.5;
const listItemMargin = 10;
const listItemWidth =
  (SCREEN_WIDTH - (listColums + 1) * listItemMargin) / listColums;
const listItemHeight =
  (SCREEN_HEIGHT - (listRows + 1) * listItemMargin) / listRows;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    flex: 1 / 2,
    width: listItemWidth,
    height: listItemHeight,
    marginTop: 3,
    marginHorizontal: 2,
  },
});
