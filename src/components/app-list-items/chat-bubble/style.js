import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";

export default StyleSheet.create({
    container: function (isFromUser) {
        return {
            alignSelf: isFromUser ? 'flex-end' : 'flex-start',
            backgroundColor: isFromUser ? Colors.grey_light : Colors.black,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: isFromUser ? 0 : 20,
            borderBottomLeftRadius: isFromUser ? 20 : 0,
            marginHorizontal: 10,
            // marginTop: 5,
            maxWidth: '90%'
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
    seenTimeContainer: function (isFromUser) {
        return {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
            marginHorizontal: 15,
            alignSelf: isFromUser ? 'flex-end' : 'flex-start'
        }
    }
})