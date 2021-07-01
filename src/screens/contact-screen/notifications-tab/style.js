import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    iconContainer: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(15) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(2)
    },
    icon: {
        width: wp(7),
        height: wp(7),
        tintColor: Colors.white
    }
})