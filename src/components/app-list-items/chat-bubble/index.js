import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Colors, Icons} from '../../../constants';
import {AppText} from '../../index';
import styles from './style';

export default function ChatBubble({item, isFromUser}) {

  const getTickIcon = (seen)=>{
    if(seen==1){
      return Icons.double_tick_icon;
    }else{
      return Icons.tick_icon;
    }
  }

  return (
    <TouchableOpacity style={styles.container(isFromUser)}>
      <View style={styles.textMsgContainer}>
        <AppText type={'medium'} color={Colors.white}>{item.body}</AppText>
        {isFromUser&&(
        <Image style={styles.seenIcon} source={getTickIcon(item.seen)}/>
        )}
        </View>
    </TouchableOpacity>
  );
}
