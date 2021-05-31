import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";

export default StyleSheet.create({
    collapseBodyContainer: function (isCollapsed) {
        return {
            paddingHorizontal: 20,
            paddingBottom: 10,
            borderBottomWidth: isCollapsed ? 1 : 0,
            borderColor: Colors.grey
        }
    },
    accountDetailItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: Colors.grey,
    },
})