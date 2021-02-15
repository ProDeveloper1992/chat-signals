import { StyleSheet } from "react-native";
import { Colors } from '../../../constants'

export default StyleSheet.create({
    modalContainer: {
        padding: 0,
        margin: 0,
        justifyContent: 'flex-end'
    },
    modalSubContainer: {
        minHeight: '60%',
        maxHeight: '85%',
        width: '100%',
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
    },
    modalTitle: {
        color: Colors.ui_primary_dark,
        fontSize: 18,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    bottomButton: {
        width: '100%',
        // position: 'absolute',
        // bottom: 0,
        padding: 10,
        backgroundColor: Colors.white
    }
})