import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create(({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderBottomWidth: 0.5,
        borderColor: Colors.grey
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(4)
    },
    statusContainer: {
        flex: 0.8,
        alignItems: 'flex-end'
    },
    statusDot: {
        width: wp(1.5),
        height: wp(1.5),
        borderRadius: wp(1.5) / 2,
        marginEnd: wp(1)
    },
    sendIconContainer: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(12) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.ui_primary,
    }
}))