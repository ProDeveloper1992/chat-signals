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
    },

    profileImg: {
        height: wp(15),
        width: wp(15),
        borderRadius: wp(15) / 2,
        alignSelf: 'center',
    },

    userDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: wp(4),
    }
});
