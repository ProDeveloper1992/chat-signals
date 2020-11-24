import { StyleSheet } from "react-native";
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";

const listColums = 2;
const listRows = 3.5;
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
        borderRadius: 5,
        // justifyContent: 'flex-end',
    },
    onlineStatusSignal: function (isOnline) {
        return {
            height: 14,
            width: 14,
            borderRadius: 7,
            marginEnd: 5,
            backgroundColor: isOnline ? Colors.green : Colors.red,
            borderWidth: 2,
            borderColor: Colors.white
        }
    },
    onlineStatusText: { color: Colors.black, fontSize: 12 },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.black_30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    bookmarkedContainer: {
        backgroundColor: Colors.white_80,
        alignSelf: 'flex-start',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        marginStart:5
    },
    bookmarkIcon:{
        width:20,
        height:20,
        resizeMode:'contain',
        tintColor:Colors.ui_primary_dark
    }
})