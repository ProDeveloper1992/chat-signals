import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: wp(2),
        paddingVertical: wp(1.8),
        borderBottomWidth: 0.5,
        borderColor: Colors.grey
    },

    profileImageContainer: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(15) / 2,
        backgroundColor: Colors.grey,
        alignItems: 'center',
        justifyContent: 'center'
    },

    activeStatusCircle: {
        height: wp(9),
        width: wp(9),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: -wp(2),
        marginBottom: -wp(3),
        // marginEnd: -20
    },

    profileImg: {
        height: wp(15),
        width: wp(15),
        borderRadius: wp(15) / 2,
        alignSelf: 'center',
    },

    userDetailContainer: {
        flex: 1,
        marginLeft: wp(4),
    },
});
