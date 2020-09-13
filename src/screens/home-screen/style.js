import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    //Top Tab Bar
    topTabContainer: {
        backgroundColor: Colors.white
    },
    topTabIndicator: {
        backgroundColor: Colors.ui_primary,
        height: 3,
        borderRadius: 30,
    },
    topTabLabel: { fontSize: 12, fontWeight: '700' }
})