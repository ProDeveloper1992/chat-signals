import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.ui_primary
    },
    rail: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.grey
    },
    railselected: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.ui_primary
    }
})