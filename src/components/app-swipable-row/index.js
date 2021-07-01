/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Animated, StyleSheet, View, I18nManager } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class AppleStyleSwipeableRow extends Component {
    renderLeftAction = (component, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        const pressHandler = () => {
            this.close();
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton style={[styles.rightAction]} onPress={pressHandler}>
                    {component}
                </RectButton>
            </Animated.View>
        );
    };
    renderLeftActions = progress => {
        return (
            <View
                style={{
                    width: widthPercentageToDP(this.props.width ? this.props.width : 40),
                    marginLeft: widthPercentageToDP(6),
                    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                }}>
                {this.props.buttons.map((button, index) => (
                    <View key={index}>
                        {this.renderLeftAction(button, 64 * (index + 1), progress)}
                    </View>
                ))}
            </View>
        );
    };
    updateRef = ref => {
        this._swipeableRow = ref;
    };
    close = () => {
        this._swipeableRow.close();
    };
    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={1}
                leftThreshold={50}
                rightThreshold={50}
                overshootLeft={false}
                overshootRight={false}
                renderLeftActions={this.renderLeftActions}>
                {children}
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        paddingRight: widthPercentageToDP(5),
        flex: 1,
        justifyContent: 'center',
    },
});
