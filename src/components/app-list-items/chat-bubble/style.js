import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: function (isFromUser) {
        return {
            alignSelf: isFromUser ? 'flex-end' : 'flex-start',
            backgroundColor: isFromUser ? Colors.grey_light : Colors.black,
            paddingHorizontal: wp(3),
            paddingVertical: wp(2),
            borderTopLeftRadius: wp(4),
            borderTopRightRadius: wp(4),
            borderBottomRightRadius: isFromUser ? 0 : wp(4),
            borderBottomLeftRadius: isFromUser ? wp(4) : 0,
            marginHorizontal: wp(4),
            maxWidth: '70%'
        }
    },
    textMsgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seenTimeContainer: function (isFromUser) {
        return {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: wp(1),
            marginHorizontal: wp(4),
            alignSelf: isFromUser ? 'flex-end' : 'flex-start'
        }
    },
    imageContainer: {
        width: wp(40),
        height: wp(40),
        resizeMode: 'cover',
        borderRadius: wp(4),
        alignSelf: 'center'
    }
})