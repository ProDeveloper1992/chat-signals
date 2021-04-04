import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Images } from '../../../constants';
import { AppText } from '../../index';
import styles from './style';
import { FriendGradientIcon32 } from '../../../constants/svg-icons';
import { useDispatch } from 'react-redux';
import { acceptRejectFriendRequest } from '../../../redux/actions/user-actions';

export default function FriendRequestItem({
    onChatPress,
    profileImage,
    userName,
    item
}) {

    const dispatch = useDispatch();

    const [isAccepting, setIsAccepting] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    const onAcceptPress = async () => {
        setIsAccepting(true);
        await dispatch(acceptRejectFriendRequest(item.id, 3));
        setIsAccepting(false);
    }

    const onRejectPress = async () => {
        setIsRejecting(true);
        await dispatch(acceptRejectFriendRequest(item.id, 4));
        setIsRejecting(false);
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
                            onPress={onAcceptPress}
                            loading={isAccepting} />

                        <Button
                            title={'Reject'}
                            onPress={onRejectPress}
                            loading={isRejecting} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const Button = ({ isAccept, title, onPress, loading }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.buttonContainer(isAccept)}>
            {loading ? (
                <ActivityIndicator size={'small'} color={isAccept ? Colors.white : Colors.black} style={{ width: 14, height: 14 }} />
            ) : (
                <AppText color={isAccept ? Colors.white : Colors.black}>{title}</AppText>
            )}
        </TouchableOpacity>
    )
}

FriendRequestItem.propTypes = {
    profileImage: PropTypes.any,
    userName: PropTypes.string,
    onChatPress: PropTypes.func,
    item: PropTypes.object
};

FriendRequestItem.defaultProps = {
    profileImage: Images.forgot_heart_logo,
    userName: 'Username',
    item: {},
    onChatPress: () => { },
};
