import { StyleSheet } from "react-native";
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";

const listColums = 2;
const listRows = 3;
const listItemMargin = 10;
const listItemWidth = (SCREEN_WIDTH - (listColums + 1) * listItemMargin) / listColums
const listItemHeight = (SCREEN_HEIGHT - (listRows + 1) * listItemMargin) / listRows

export default StyleSheet.create({
    listItemContainer: {
        flex: 1,
        marginLeft: listItemMargin,
        marginTop: 10,
        width: listItemWidth,
        height: listItemHeight,
        backgroundColor: 'lightgrey',
        borderRadius: 5
    },
    onlineStatusContainer: {
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        position: 'absolute',
        left: 5,
        top: 5,
    },
    onlineStatusSignal: function (isOnline) {
        return {
            height: 10,
            width: 10,
            borderRadius: 5,
            marginEnd: 5,
            backgroundColor: isOnline ? 'green' : 'red',
        }
    },
    onlineStatusText: { color: Colors.black, fontSize: 12 }
})