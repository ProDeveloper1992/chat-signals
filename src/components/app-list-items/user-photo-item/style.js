import { StyleSheet } from "react-native";
import { Colors, SCREEN_HEIGHT } from "../../../constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        height: SCREEN_HEIGHT / 4,
        backgroundColor: Colors.grey_light,
        borderRadius: 4
    }
})