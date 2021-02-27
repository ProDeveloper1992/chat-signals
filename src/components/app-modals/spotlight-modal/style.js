import { StyleSheet } from "react-native";
import { Colors } from '../../../constants'

export default StyleSheet.create({
    modalContainer: {
        padding: 0,
        margin: 20,
        justifyContent: 'center',
    },
    modalSubContainer: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 5
    }
})