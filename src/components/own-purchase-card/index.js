import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { AppText } from '..';
import { Colors } from '../../constants';
import OwnPackageSlider from '../own-package-slider'

export default function OwnPurchaseCard({ icon, onPress, buttonColor }) {
    return (
        <View style={styles.container}>
            <AppText type={'bold'} size={18} style={{ textAlign: 'center' }}>{'Own Package'}</AppText>
            <AppText size={12} style={{ textAlign: 'center' }}>{"How many credits would you like to have? - Here you have it in your own hands!"}</AppText>
            <OwnPackageSlider
                value={100}
                minimumValue={0}
                maximumValue={500}
                onValueChange={value => { }}
                trackStyle={customStyles4.track}
                thumbStyle={customStyles4.thumb}
                minimumTrackTintColor='#d14ba6'
            />
        </View>
    );
}

var customStyles4 = StyleSheet.create({
    track: {
        height: 15,
        borderRadius: 15 / 2,
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.15,
    },
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        borderColor: '#a4126e',
        borderWidth: 3,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.35,
    }
});

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: Colors.grey,
        backgroundColor: Colors.white
    },
});
