import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    collapseBodyContainer: function (isCollapsed) {
        return {
            paddingHorizontal: wp(4),
            paddingBottom: wp(2),
            borderBottomWidth: isCollapsed ? 1 : 0,
            borderColor: Colors.grey
        }
    },
    accountDetailItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: wp(3),
        paddingHorizontal: wp(5),
        borderBottomWidth: 1,
        borderColor: Colors.grey,
    },
})