import { StyleSheet } from "react-native";
import { Colors } from '../../../constants'

export default StyleSheet.create({
    modalContainer: {
        padding: 0,
        margin: 0,
        justifyContent: 'center'
    },
    modalSubContainer: {
        height: '100%',
        backgroundColor: Colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    modalTitle: {
        color: Colors.ui_primary_dark,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    }
})