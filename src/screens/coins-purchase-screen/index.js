import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { GeneralHeader } from '../../components/Headers';
import { useNavigation } from '@react-navigation/native';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../constants';

const CoinPurchase = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  return (
    <View style={styles.container}>
      <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={appLabels.purchase}
      />
      <ScrollView
        style={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}>
        <PurchaseCoinBox
          style={{
            backgroundColor: '#ace',
          }}
          icon={Icons.icon_emoji_cool}
          planName={'Supreme'}
          offerText={'10% off'}
          totalCoins={'1000'}
          coinPrice={'18.99$'}
        />

        <PurchaseCoinBox
          style={{
            backgroundColor: '#ADEFD1FF',
          }}
          icon={Icons.icon_emoji_love}
          planName={'Supreme'}
          offerText={'10% off'}
          totalCoins={'1000'}
          coinPrice={'18.99$'}
        />

        <PurchaseCoinBox
          style={{
            backgroundColor: '#CDB599FF',
          }}
          icon={Icons.icon_emoji_happy}
          planName={'Supreme'}
          offerText={'10% off'}
          totalCoins={'1000'}
          coinPrice={'18.99$'}
        />

        <PurchaseCoinBox
          style={{
            backgroundColor: '#ece',
          }}
          icon={Icons.icon_emoji_cool}
          planName={'Supreme'}
          offerText={'10% off'}
          totalCoins={'1000'}
          coinPrice={'18.99$'}
        />

        <PurchaseCoinBox
          style={{
            backgroundColor: '#97BC62FF',
          }}
          icon={Icons.icon_emoji_love}
          planName={'Supreme'}
          offerText={'10% off'}
          totalCoins={'1000'}
          coinPrice={'18.99$'}
        />
      </ScrollView>
    </View>
  );
};

const PurchaseCoinBox = (props) => {
  return (
    <TouchableOpacity
      style={[
        props.style,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 15,
          marginVertical: 5,
        },
      ]}
      onPress={props.onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            borderWidth: 3,
            marginRight: 20,
            borderColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={props.icon} style={{ height: 24, width: 24 }} />
        </View>
        <View style={{}}>
          <Text>{props.planName}</Text>
          <Text>{props.offerText}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text>{props.totalCoins}</Text>
        <Text>{props.coinPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CoinPurchase;
