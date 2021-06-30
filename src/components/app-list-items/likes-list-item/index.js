import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, DEFAULT_AVATAR_URL, Images } from '../../../constants';
import { AppText, FriendItemMenu } from '../../index';
import styles from './style';
import { HeartGradientIcon32, KissGradientIcon32, LikeGradientIcon32, StickerGradientIcon32 } from '../../../constants/svg-icons';
import moment from 'moment';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ICON_SIZE = hp(6);

export default function LikesListItem({
    item,
    type
}) {

    const getIconByType = () => {
        switch (type) {
            case 'like':
                return <LikeGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />;

            case 'kiss':
                return <KissGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />;

            case 'heart':
                return <HeartGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />;

            case 'sticker':
                return <StickerGradientIcon32 width={ICON_SIZE} height={ICON_SIZE} />;
            default:
                return <></>;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image style={styles.profileImg} source={{ uri: item.picture }} />
                <View style={styles.activeStatusCircle}>
                    {getIconByType()}
                </View>
            </View>
            <View style={styles.userDetailContainer}>
                <AppText
                    type={'bold'}
                    size={hp(2.5)}
                    color={Colors.black}
                    numberOfLines={1}
                    style={{ textTransform: 'capitalize' }}
                >
                    {item && item.username}
                </AppText>
                <AppText
                    type={'regular'}
                    size={hp(2.2)}
                    color={Colors.ui_primary}
                    numberOfLines={1}
                >
                    {moment(item.created_at).fromNow()}
                </AppText>
            </View>
        </View>
    );
}

LikesListItem.propTypes = {
    item: PropTypes.object,
    type: PropTypes.oneOf(['like', 'heart', 'kiss', 'sticker'])
};

LikesListItem.defaultProps = {
    item: {
        created_at: Date.now(),
        username: '',
        picture: DEFAULT_AVATAR_URL
    },
    type: 'like',
};
