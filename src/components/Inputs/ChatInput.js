import React from 'react';
import {StyleSheet, TextInput, Platform, View, Image, TouchableOpacity} from 'react-native';
import {Colors, Icons} from '../../constants';
import {AppText} from '../../components';

export function ChatInput({style,onSendPress, ...props}) {
  return (
    <View style={styles.container}>
        <TextInput
            {...props}
            style={[
            styles.input,
            style
            ]}
            placeholderTextColor={'darkgray'}
            autoCapitalize={'none'}
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.sendIconContainer} onPress={onSendPress}>
            <Image style={styles.sendIcon} source={Icons.send_icon}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        backgroundColor:Colors.white,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    input: {
        flex:1,
        paddingVertical: 15,
        color: Colors.black,
    },
    errorText: {
        textAlign: 'right',
    },
    sendIcon:{
        width:24, 
        height:24, 
        resizeMode:'contain',
        tintColor:Colors.white,
        marginStart:5
    },
    sendIconContainer:{
        width:40, 
        height:40, 
        borderRadius:20, 
        alignItems:'center', 
        justifyContent:'center', 
        backgroundColor:Colors.ui_primary,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    }
});