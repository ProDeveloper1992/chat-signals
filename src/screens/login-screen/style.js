import { StyleSheet } from "react-native";
import { Colors } from "../../constants";
import { getFontFamily } from "../../utils/common";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25,
    },
    input: {
        marginVertical: 5,
    },
    loginButton: {
        marginTop: 10,
    },
    appleLoginButton: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        borderColor: Colors.greydark,
        borderWidth: 1.5
    },
    appleLoginButtonTitle: {
        flex: 1,
        fontFamily: getFontFamily('medium'),
        color: Colors.greydark,
        alignSelf: 'center',
        textAlign: 'center'
    },
    appleButtoniOS: {
        height: 45,
    }
})