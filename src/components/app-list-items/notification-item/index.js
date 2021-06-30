import moment from 'moment';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, DEFAULT_AVATAR_URL, Images } from '../../../constants';
import { AppText } from '../../index';
import styles from './style';
import { FriendGradientIcon32, HeartGradientIcon32, KissGradientIcon32, LikeGradientIcon32, StickerGradientIcon32 } from '../../../constants/svg-icons';
import { navigate } from '../../../navigators/root-navigation';
import { useDispatch } from 'react-redux';
import { readNotification } from '../../../redux/actions/user-actions';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ICON_SIZE = hp(6);

export default function NotificationItem({ item }) {

    const dispatch = useDispatch();

    const user = item.extra_data ? JSON.parse(item.extra_data) : null;

    const getIconByType = () => {
        switch (item.type) {
            case 'send_like':
                return <LikeGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />

            case 'send_kiss':
                return <KissGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />

            case 'send_heart':
                return <HeartGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />

            case 'send_sticker':
                return <StickerGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />

            case 'send_friend_request':
                return <FriendGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />

            default:
                return <></>;
        }
    }

    const getNotificationMessage = () => {
        switch (item.type) {
            case 'send_like':
                return 'liked you!'

            case 'send_kiss':
                return 'kissed you!'

            case 'send_heart':
                return 'sent you a heart!'

            case 'send_sticker':
                return 'sent you a sticker!'

            default:
                return null;
        }
    }

    const getNotificationImage = () => {
        if (item.profile_details != null && item.profile_details.profile_picture && item.profile_details.profile_picture.length > 0) {
            return item.profile_details.profile_picture[0].picture;
        }
        return DEFAULT_AVATAR_URL;
    }

    const onItemPress = () => {
        dispatch(readNotification(item.id));
        if (item.profile_details != null) {
            let moderator = {
                id: item.profile_details.id,
                profilepicture: item.profile_details.profile_picture,
                username: item.profile_details.username,
                dob: item.profile_details.dob,
                city: item.profile_details.city,
                country: item.profile_details.country
            }
            navigate('ModeratorProfile', { item: moderator, isFromChat: true })
        }
        // switch (item.type) {
        //     case 'send_like':
        //         navigate('LikesScreen');
        //         break;

        //     case 'send_kiss':
        //         navigate('KissesScreen');
        //         break;

        //     case 'send_heart':
        //         navigate('HeartsScreen');
        //         break;

        //     case 'send_sticker':
        //         break;

        //     default:
        //         break;
        // }
    }

    return (
        <TouchableOpacity
            underlayColor={Colors.ui_background}
            style={styles.container}
            onPress={onItemPress}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.profileImageContainer}>
                    <Image style={styles.profileImg} source={{ uri: getNotificationImage() }} />
                    <View style={styles.activeStatusCircle}>
                        {getIconByType()}
                    </View>
                </View>
                <View style={styles.userDetailContainer}>
                    {user && user.user_name ? (
                        <AppText
                            type={'bold'}
                            size={hp(2.2)}
                            color={Colors.black}
                            numberOfLines={1}
                        >
                            {`${user.user_name}`}
                        </AppText>
                    ) : null}
                    {user && user.title ? (
                        <AppText
                            type={'regular'}
                            size={hp(2.1)}
                            color={Colors.greydark}
                            numberOfLines={1}
                        >
                            {`${user.title}`}
                        </AppText>
                    ) : null}
                    <AppText
                        type={'medium'}
                        size={hp(2)}
                        color={Colors.ui_primary}
                    >
                        {moment(item.created_at).fromNow()}
                    </AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

NotificationItem.propTypes = {
    profileImage: PropTypes.any,
    userName: PropTypes.string,
    time: PropTypes.any,
    type: PropTypes.string,
};

NotificationItem.defaultProps = {
    profileImage: Images.app_logo,
    userName: 'Username',
    time: new Date(),
    type: 'like',
};
