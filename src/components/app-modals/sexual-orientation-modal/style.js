import { StyleSheet } from "react-native";
import { Colors } from '../../../constants'

export default StyleSheet.create({
    modalContainer: {
        padding: 0,
        margin: 0,
        justifyContent: 'flex-end'
    },
    modalSubContainer: {
        height: '85%',
        width: '100%',
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        color: Colors.ui_primary_dark,
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomButton: {
        width: '100%',
        backgroundColor: Colors.white,
    }
})