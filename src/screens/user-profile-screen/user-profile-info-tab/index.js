import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {AppText} from '../../../components';
import {Icons} from '../../../constants';
import styles from './style';

export default function UserProfileInfoTab(props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Geschlecht'}
        Value={'Frau'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Wohnort'}
        Value={'DE'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Entfernung'}
        Value={'25 km Umkreis'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Alter'}
        Value={'35'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Sternzeichen'}
        Value={'Fisch'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Grosse'}
        Value={'160cm - 170cm'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Figur'}
        Value={'normal'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Haarfarbe'}
        Value={'schwarz'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Augenfarbe'}
        Value={'blau'}
      />
      <PropertyHolder
        IconSource={Icons.chat_active}
        Key={'Hautfarbe'}
        Value={'hell'}
      />
    </ScrollView>
  );
}

const PropertyHolder = (props) => {
  return (
    <View style={styles.propertyContainer}>
      <View style={styles.subPropertyContainer}>
        <View style={styles.iconView}>
          <Image source={props.IconSource} style={styles.iconSize} />
        </View>
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
