import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText } from '../../../components';
import { Icons } from '../../../constants';
import styles from './style';

export default function ModeratorProfileInfoTab(props) {

  const { appLabels } = useSelector((state) => state.appState);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.gender}
        Value={'Frau'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.country}
        Value={'DE'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.distance}
        Value={'25 km Radius'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.age}
        Value={'35'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.zodiac_sign}
        Value={'fish'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.height}
        Value={'160cm - 170cm'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.figure}
        Value={'normal'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.hair_color}
        Value={'black'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.eye_color}
        Value={'blue'}
      />
      <PropertyHolder
        // IconSource={Icons.chat_active}
        Key={appLabels.skin_color}
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
          <AppText type={'bold'} size={13} style={{ textAlign: 'center' }}>
            {props.Key}
          </AppText>
        </View>
      </View>
      <View style={styles.subPropertyContainer}>
        <AppText size={12} style={{ textAlign: 'center' }}>
          {props.Value}
        </AppText>
      </View>
    </View>
  );
};
