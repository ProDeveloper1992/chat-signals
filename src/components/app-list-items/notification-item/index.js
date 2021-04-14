import moment from 'moment';
import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Images } from '../../../constants';
import { AppText } from '../../index';
import styles from './style';
import { HeartGradientIcon32, KissGradientIcon32, LikeGradientIcon32, StickerGradientIcon32 } from '../../../constants/svg-icons';

export default function NotificationItem({
    onChatPress,
    profileImage,
    userName,
    time,
    type
}) {

    const getIconByType = () => {
        switch (type) {
            case 'like':
                return <LikeGradientIcon32 width={40} height={40} />

            case 'kiss':
                return <KissGradientIcon32 width={40} height={40} />

            case 'heart':
                return <HeartGradientIcon32 width={40} height={40} />

            case 'sticker':
                return <StickerGradientIcon32 width={40} height={40} />

            default:
                return null;
        }
    }

    const getNotificationMessage = () => {
        switch (type) {
            case 'like':
                return 'liked you!'

            case 'kiss':
                return 'kissed you!'

            case 'heart':
                return 'sent you a heart!'

            case 'sticker':
                return 'sent you a sticker!'

            default:
                return null;
        }
    }

    return (
        <TouchableHighlight
            underlayColor={Colors.ui_background}
            style={styles.container}
            onPress={onChatPress}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.profileImageContainer}>
                    <Image style={styles.profileImg} source={profileImage} />
                    <View style={styles.activeStatusCircle}>
                        {getIconByType()}
                    </View>
                </View>
                <View style={styles.userDetailContainer}>
                    <AppText
                        type={'medium'}
                        size={15}
                        color={Colors.black}
                        numberOfLines={1}
                    >
                        {`${userName} ${getNotificationMessage()}`}
                    </AppText>
                    <AppText
                        type={'medium'}
                        size={12}
                        color={Colors.ui_primary}
                    >
                        {moment(time).fromNow()}
                    </AppText>
                </View>
            </View>
        </TouchableHighlight>
    );
}

NotificationItem.propTypes = {
    profileImage: PropTypes.any,
    userName: PropTypes.string,
    time: PropTypes.any,
    type: PropTypes.string,
    onChatPress: PropTypes.func,
};

NotificationItem.defaultProps = {
    profileImage: Images.forgot_heart_logo,
    userName: 'Username',
    time: new Date(),
    type: 'like',
    onChatPress: () => { },
};
