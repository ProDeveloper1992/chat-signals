import { StyleSheet } from "react-native";
import { Colors } from '../../../constants'

export default StyleSheet.create({
    modalContainer: {
        padding: 0,
        margin: 20,
        justifyContent: 'center'
    },
    modalSubContainer: {
        maxHeight: '80%',
        backgroundColor: Colors.white,
        borderRadius: 15,
        paddingBottom: 20
    },
    modalTitle: {
        color: Colors.ui_primary_dark,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    }
})