import { StyleSheet } from "react-native";
import { Colors } from '../../../constants'

export default StyleSheet.create({
    modalContainer: {
        padding: 0,
        margin: 10,
        justifyContent: 'center',
    },
    modalSubContainer: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        color: Colors.ui_primary_dark,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    }
})