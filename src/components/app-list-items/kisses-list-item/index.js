import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Images } from '../../../constants';
import { AppText, FriendItemMenu } from '../../index';
import styles from './style';
import { KissGradientIcon32 } from '../../../constants/svg-icons';
import moment from 'moment';

export default function KissesListItem({
    profileImage,
    userName,
    item
}) {

    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image style={styles.profileImg} source={profileImage} />
                <View style={styles.activeStatusCircle}>
                    <KissGradientIcon32 width={40} height={40} />
                </View>
            </View>
            <View style={styles.userDetailContainer}>
                <AppText
                    type={'bold'}
                    size={16}
                    color={Colors.black}
                    numberOfLines={1}
                    style={{ textTransform: 'capitalize' }}
                >
                    {userName}
                </AppText>
                <AppText
                    type={'regular'}
                    size={14}
                    color={Colors.ui_primary}
                    numberOfLines={1}
                >
                    {moment(item.created_at).fromNow()}
                </AppText>
            </View>
        </View>
    );
}

KissesListItem.propTypes = {
    profileImage: PropTypes.any,
    userName: PropTypes.string,
    onChatPress: PropTypes.func,
    item: PropTypes.object
};

KissesListItem.defaultProps = {
    profileImage: Images.app_logo,
    userName: 'Username',
    item: {},
    onChatPress: () => { },
};
