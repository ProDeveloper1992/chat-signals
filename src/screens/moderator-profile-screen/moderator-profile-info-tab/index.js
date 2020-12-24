import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {AppText} from '../../../components';
import {Icons} from '../../../constants';
import styles from './style';

export default function ModeratorProfileInfoTab(props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Gender'}
        Value={'Frau'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Country'}
        Value={'DE'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Distance'}
        Value={'25 km Radius'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Age'}
        Value={'35'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Zodiac Sign'}
        Value={'fish'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Height'}
        Value={'160cm - 170cm'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Figure'}
        Value={'normal'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Hair Color'}
        Value={'black'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Eye color'}
        Value={'blue'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={'Skin color'}
        Value={'bright'}
      />
    </ScrollView>
  );
}

const PropertyHolder = (props) => {
  return (
    <View style={styles.propertyContainer}>
      <View style={styles.subPropertyContainer}>
        {/* <View style={styles.iconView}>
          <Image source={props.IconSource} style={styles.iconSize} />
        </View> */}
        <View style={styles.txtContainer}>
          <AppText type={'bold'} size={13} style={{textAlign: 'center'}}>
            {props.Key}
          </AppText>
        </View>
      </View>
      <View style={styles.subPropertyContainer}>
        <AppText size={12} style={{textAlign: 'center'}}>
          {props.Value}
        </AppText>
      </View>
    </View>
  );
};
