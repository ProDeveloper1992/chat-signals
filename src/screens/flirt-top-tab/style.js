import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";

const listColums = 2;
const listRows = 3;
const listItemMargin = 10;
const listItemWidth = (SCREEN_WIDTH - (listColums + 1) * listItemMargin) / listColums
const listItemHeight = (SCREEN_HEIGHT - (listRows + 1) * listItemMargin) / listRows


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    listItemContainer: {
        flex: 1,
        marginLeft: listItemMargin,
        marginTop: 10,
        width: listItemWidth,
        height: listItemHeight,
        backgroundColor: 'lightgrey',
        borderRadius: 5
    },
})