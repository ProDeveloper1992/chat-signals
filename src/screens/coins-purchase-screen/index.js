import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Platform,
  SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { BackHeader, GeneralHeader } from '../../components/Headers';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { getGeneralSettings, getPaymentModule } from '../../redux/actions/app-actions';
import { Colors, Icons, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import { AppIndicatorLoader, AppText, AppButton, OwnPurchaseCard } from '../../components';
import { CoinGradientIcon } from '../../constants/svg-icons';
import { ActionDispatcher } from '../../redux/actions';
import { GET_PAYMENT_MODULE_SUCCESS } from '../../redux/actions/types';
import { getGeneralSettingValueByName, wait } from '../../utils/common';

const CoinPurchase = () => {
  const scrollViewRef = useRef();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { appLabels, paymentGateways, loadingPaymentGateways, generalSettings } = useSelector((state) => state.appState);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [perEuroCredit, setPerEuroCredit] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [ownPackagePrice, setOwnPackagePrice] = useState(0);

  let androidPaymentGateways = [];
  let iosPaymentGateways = [];

  if (paymentGateways && paymentGateways.length > 0) {
    androidPaymentGateways = paymentGateways.filter((item, index) => item.payment_name != 'Apple pay');
    iosPaymentGateways = paymentGateways.filter((item, index) => item.payment_name == 'Apple pay');
  }

  useEffect(() => {
    if (isFocused) {
      dispatch(getGeneralSettings());
      dispatch(getPaymentModule());
      let perEuroCredit = getGeneralSettingValueByName('per_euro_credits');
      setPerEuroCredit(perEuroCredit);

      if (Platform.OS == 'ios' && iosPaymentGateways && iosPaymentGateways.length > 0) {
        onPaymentGatwayItemPress(iosPaymentGateways[0]);
      }
    } else {
      if (Platform.OS == 'android') {
        setSelectedPaymentGateway(null);
      }
    }
  }, [isFocused]);

  const onPaymentGatwayItemPress = (paymentItem) => {
    console.log("paymentItem", paymentItem);
    setSelectedPaymentGateway(paymentItem);
    setSelectedPackage(paymentItem.packagemodules[0]);
    let price = paymentItem.packagemodules[0].price * 1;
    setOwnPackagePrice(price);
    wait(600).then(() => {
      scrollViewRef.current.scrollTo({
        y: SCREEN_HEIGHT,
        animated: true,
      })
    })
  }

  const onSelectPackageModule = (item) => {
    setSelectedPackage(item);
    console.log(item);
    let price = item.price * 1;
    setOwnPackagePrice(price);
  }

  const onChangeOwnPackagePrice = (value) => {
    let fixedValue = value.toFixed(0);
    setOwnPackagePrice(fixedValue * 1);
    setSelectedPackage(null);
  }

  return (
    <View style={styles.container}>
      <GeneralHeader
        label={appLabels.buy_coins}
      />
      <ScrollView
        ref={scrollViewRef}>
        <AppText type={'bold'} size={16} style={{ marginHorizontal: wp(4) }}>{`${appLabels.step} 1 - ${appLabels.payment_method}`}</AppText>
        {loadingPaymentGateways && paymentGateways.length == 0 ? (
          <View style={{ padding: 10 }}>
            {/* <StepTitleLoader /> */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <PaymentMethodItemLoader key={String(index)} />
                )}
                keyExtractor={(item, index) => String(index)}
              />
            </View>
          </View>
        ) : (
          <View style={{ padding: 10 }}>
            {Platform.OS == 'ios' ? (
              <FlatList
                data={iosPaymentGateways}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <PaymentGatwayItem
                    key={String(index)}
                    imageUrl={item.picture}
                    onPress={() => onPaymentGatwayItemPress(item)}
                    isSelected={item == selectedPaymentGateway ? true : false}
                  />
                )}
                keyExtractor={(item, index) => String(index)}
              />
            ) : (
              <FlatList
                data={androidPaymentGateways}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <PaymentGatwayItem
                    key={String(index)}
                    imageUrl={item.picture}
                    onPress={() => onPaymentGatwayItemPress(item)}
                    isSelected={item == selectedPaymentGateway ? true : false}
                  />
                )}
                keyExtractor={(item, index) => String(index)}
              />
            )}
          </View>
        )}
        {selectedPaymentGateway != null && (
          <>
            <View>
              <AppText type={'bold'} size={16} style={{ marginHorizontal: wp(4) }}>{`${appLabels.step} 2 - ${appLabels.choose_your_package_size}`}</AppText>
              {selectedPaymentGateway.packagemodules && (
                <>
                  <FlatList
                    numColumns={3}
                    data={selectedPaymentGateway.packagemodules}
                    contentContainerStyle={{ padding: 10 }}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={String(index)}
                        onPress={() => onSelectPackageModule(item)}
                        style={[styles.packageListItem, {
                          borderColor: selectedPackage ? selectedPackage.id === item.id ? Colors.ui_primary : Colors.grey_light : Colors.grey_light,
                        }]}>
                        <View style={{ alignItems: 'center' }}>
                          <CoinGradientIcon />
                          <AppText
                            type={'medium'}
                            size={12}
                            color={Colors.black}>
                            {`${perEuroCredit * item.price} ${appLabels.Coins}`}
                          </AppText>
                        </View>
                        <View>
                          <AppText
                            type={'bold'}
                            size={14}
                            color={Colors.black}>
                            {`${item.price}€`}
                          </AppText>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => String(index)}
                  />
                  {/* {selectedPackage != null && (
                    <>
                      <AppButton
                        type={'positive'}
                        style={{ marginTop: 20 }}
                        title={`Order for ${selectedPackage.price}€ for fee`}
                      />
                      <AppText size={12} style={{ marginVertical: 10, textAlign: 'center' }}>{`You will be credited with ${perEuroCredit * selectedPackage.price} credits after purchase.`}</AppText>
                    </>
                  )} */}
                </>
              )}
              <OwnPurchaseCard
                sliderCount={ownPackagePrice}
                minimumSliderCount={0}
                maximumSliderCount={500}
                onChangeSliderValue={(value) => onChangeOwnPackagePrice(value)}
                creditPerCurrency={perEuroCredit}
                paymentUrl={selectedPaymentGateway.payment_url} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const PaymentGatwayItem = ({ onPress, imageUrl, isSelected }) => {
  return (
    <TouchableOpacity
      style={{ width: '28%', alignItems: 'center', margin: 10, padding: 10, borderWidth: isSelected ? 3 : 1, borderColor: isSelected ? Colors.ui_primary : Colors.grey, borderRadius: 15 }}
      onPress={onPress}>
      <Image style={styles.paymetGatewayImage} source={{ uri: imageUrl }} />
    </TouchableOpacity>
  );
};

export const PaymentMethodItemLoader = () => (
  <View style={styles.container}>
    <ContentLoader
      speed={0.5}
      width={SCREEN_WIDTH / 3}
      height={100}
      viewBox={`0 0 ${SCREEN_WIDTH / 3} 100`}
      backgroundColor={Colors.ui_background}
      foregroundColor={Colors.grey}
    >
      <Rect x="10" y="10" rx="20" ry="20" width={SCREEN_WIDTH / 4} height="80" />
    </ContentLoader>
  </View>
);

export const StepTitleLoader = () => (
  <ContentLoader
    speed={0.5}
    width={SCREEN_WIDTH}
    height={30}
    viewBox={`0 0 ${SCREEN_WIDTH} 30`}
    backgroundColor={Colors.ui_background}
    foregroundColor={Colors.grey}
  >
    <Rect x="10" y="10" rx="5" ry="5" width={SCREEN_WIDTH / 1.8} height="20" />
  </ContentLoader>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  paymetGatewayImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  coinIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginEnd: 5
  },
  packageListItem: {
    // padding: 10,
    width: '28%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2
  }
});

export default CoinPurchase;
