import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderColor: Colors.grey
    },

    profileImageContainer: {
        width: 54,
        height: 54,
        borderRadius: 28,
        backgroundColor: Colors.grey,
        alignItems: 'center',
        justifyContent: 'center'
    },

    activeStatusCircle: {
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 3,
        right: 0,
        marginBottom: -10,
        // marginEnd: -20
    },

    profileImg: {
        height: 54,
        width: 54,
        borderRadius: 28,
        alignSelf: 'center',
    },

    userDetailContainer: {
        flex: 1,
        marginLeft: 15,
    },

    arrowRight: {
        height: 12,
        width: 13,
        resizeMode: 'cover',
        marginTop: 10,
        alignSelf: 'flex-end',
    },

    buttonContainer: function (isAccept) {
        return {
            paddingHorizontal: 22,
            paddingVertical: 7,
            borderRadius: 43,
            marginEnd: 7,
            backgroundColor: isAccept ? Colors.ui_primary : Colors.ui_background
        }
    }
});
