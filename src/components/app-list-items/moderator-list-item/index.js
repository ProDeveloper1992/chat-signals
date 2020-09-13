import React from 'react';
import { TouchableOpacity, ImageBackground, View, Text } from 'react-native';
import styles from './style'

export default function ModeratorListItem({ item, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress} activeOpacity={0.6}>
            <ImageBackground
                style={styles.listItemContainer}
                resizeMode={'cover'}
                imageStyle={{ borderRadius: 5 }}
                source={{
                    uri: item.image_url,
                }}>
                <OnlineStatus isOnline={item.is_online} />
            </ImageBackground>
        </TouchableOpacity>
    );

}

const OnlineStatus = (props) => {
    const { isOnline } = props;
    return (
        <View style={styles.onlineStatusContainer}>
            <View style={styles.onlineStatusSignal(isOnline)} />
            <Text style={styles.onlineStatusText}>
                {isOnline ? 'Online' : 'Offline'}
            </Text>
        </View>
    )
}
