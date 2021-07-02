import React, { useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Images } from '../../../constants';
import { AppText, FriendItemMenu } from '../../index';
import styles from './style';
import { FriendGradientIcon32 } from '../../../constants/svg-icons';
import { useDispatch } from 'react-redux';
import { acceptRejectFriendRequest } from '../../../redux/actions/user-actions';
import { blockModerator } from '../../../redux/actions/flirts-actions';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ICON_SIZE = hp(6);

export default function FriendListItem({
    profileImage,
    userName,
    item
}) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const onSelectMenuOption = async (menu) => {
        switch (menu.id) {
            case 1:
                setLoading(true);
                await dispatch(acceptRejectFriendRequest(item.id, 1));
                setLoading(false);
                break;
            case 2:
                setLoading(true);
                await dispatch(blockModerator(item.profile_id, 1));
                setLoading(false);
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.profileImageContainer}>
                    <Image style={styles.profileImg} source={profileImage} />
                    <View style={styles.activeStatusCircle}>
                        <FriendGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />
                    </View>
                </View>
                <View style={styles.userDetailContainer}>
                    <AppText
                        type={'bold'}
                        size={wp(4.5)}
                        color={Colors.black}
                        numberOfLines={1}
                        style={{ flex: 1, textTransform: 'capitalize' }}
                    >
                        {userName}
                    </AppText>
                    {loading ? (<ActivityIndicator size={'small'} color={Colors.ui_primary} style={{ padding: wp(2) }} />) : (
                        <FriendItemMenu
                            onSelectOption={(menu) => onSelectMenuOption(menu)} />
                    )}
                </View>
            </View>
        </View>
    );
}

FriendListItem.propTypes = {
    profileImage: PropTypes.any,
    userName: PropTypes.string,
    onChatPress: PropTypes.func,
    item: PropTypes.object
};

FriendListItem.defaultProps = {
    profileImage: Images.app_logo,
    userName: 'Username',
    item: {},
    onChatPress: () => { },
};
