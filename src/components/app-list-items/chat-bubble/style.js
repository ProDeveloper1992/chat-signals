import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";

export default StyleSheet.create({
    container: function (isFromUser) {
        return {
            alignSelf: isFromUser ? 'flex-end' : 'flex-start',
            backgroundColor: isFromUser ? Colors.grey_light : Colors.black,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderTopLeftRadius: isFromUser ? 20 : 0,
            borderTopRightRadius: 20,
            borderBottomRightRadius: isFromUser ? 0 : 20,
            borderBottomLeftRadius: 20,
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