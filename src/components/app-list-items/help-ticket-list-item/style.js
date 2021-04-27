import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";

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
        padding: 15
    },
    statusContainer: {
        flex: 0.8,
        alignItems: 'flex-end'
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginEnd: 3
    },
    sendIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.ui_primary,
    }
}))