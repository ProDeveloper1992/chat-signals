import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Images } from '../../../constants';
import { AppText } from '../../index';
import styles from './style';
import { FriendGradientIcon32 } from '../../../constants/svg-icons';

export default function FriendRequestItem({
    onChatPress,
    profileImage,
    userName,
}) {

    const onAcceptPress = () => {

    }

    const onRejectPress = () => {

    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.profileImageContainer}>
                    <Image style={styles.profileImg} source={profileImage} />
                    <View style={styles.activeStatusCircle}>
                        <FriendGradientIcon32 width={40} height={40} />
                    </View>
                </View>
                <View style={styles.userDetailContainer}>
                    <AppText
                        type={'bold'}
                        size={16}
                        color={Colors.black}
                        numberOfLines={1}
                    >
                        {userName}
                    </AppText>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Button
                            isAccept
                            title={'Accept'}
                            onPress={onAcceptPress} />

                        <Button
                            title={'Reject'}
                            onPress={onRejectPress} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const Button = ({ isAccept, title, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.buttonContainer(isAccept)}>
            <AppText color={isAccept ? Colors.white : Colors.black}>{title}</AppText>
        </TouchableOpacity>
    )
}

FriendRequestItem.propTypes = {
    profileImage: PropTypes.any,
    userName: PropTypes.string,
    onChatPress: PropTypes.func,
};

FriendRequestItem.defaultProps = {
    profileImage: Images.forgot_heart_logo,
    userName: 'Username',
    onChatPress: () => { },
};
