import { StyleSheet } from "react-native";
import { Colors } from '../../../constants'

export default StyleSheet.create({
    modalContainer: {
        padding: 0,
        margin: 0,
        justifyContent: 'center'
    },
    modalSubContainer: {
        minHeight:'60%',
        width:'100%',
        // backgroundColor: Colors.white,
        borderRadius:8,
        // padding: 10,
    },
    modalTitle: {
        color: Colors.ui_primary_dark,
        fontSize: 18,
        fontWeight: 'bold',
        // marginBottom: 10,
    }
})