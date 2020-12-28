import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";

export default StyleSheet.create({
    container: function (isFromUser) {
        return {
            alignSelf: isFromUser ? 'flex-end' : 'flex-start',
            backgroundColor: isFromUser ? Colors.ui_primary : Colors.white,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderTopLeftRadius: isFromUser ? 8 : 0,
            borderTopRightRadius: 8,
            borderBottomRightRadius: isFromUser ? 0 : 8,
            borderBottomLeftRadius: 8,
            marginHorizontal: 10,
            marginTop: 5,
            maxWidth: '70%'
        }
    },
    textMsgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seenIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginStart: 5
    },
})