import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: wp(2.5),
        paddingHorizontal: wp(4),
        borderBottomWidth: 0.5,
        borderColor: Colors.grey
    },

    profileImageContainer: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(12) / 2,
        backgroundColor: Colors.grey,
        alignItems: 'center',
        justifyContent: 'center'
    },

    activeStatusCircle: {
        height: wp(5),
        width: wp(5),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 3,
        right: 0,
        marginBottom: -wp(2),
        // marginEnd: -20
    },

    profileImg: {
        height: wp(12),
        width: wp(12),
        borderRadius: wp(12) / 2,
        alignSelf: 'center',
    },

    userDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: wp(4),
    }
});
