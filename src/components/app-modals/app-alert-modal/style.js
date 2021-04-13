import { StyleSheet } from "react-native";
import { Colors } from '../../../constants'

export default StyleSheet.create({
    modalContainer: {
        padding: 0,
        margin: 24,
        justifyContent: 'center'
    },
    modalSubContainer: {
        maxHeight: '80%',
        backgroundColor: Colors.white,
        borderRadius: 20,
    },
})