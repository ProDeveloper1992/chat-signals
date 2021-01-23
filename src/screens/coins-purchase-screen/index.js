import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { BackHeader, GeneralHeader } from '../../components/Headers';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { getPaymentModule } from '../../redux/actions/app-actions';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Icons } from '../../constants';
import { AppIndicatorLoader, AppText, AppButton, OwnPurchaseCard } from '../../components';

const CoinPurchase = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { appLabels, paymentGateways, loadingPaymentGateways, generalSettings } = useSelector((state) => state.appState);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [perEuroCredit, setPerEuroCredit] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [ownPackagePrice, setOwnPackagePrice] = useState(0);

  useEffect(() => {
    if (isFocused) {
      dispatch(getPaymentModule());
      if (generalSettings.length > 0) {
        for (let setting of generalSettings) {
          if (setting.name === 'per_euro_credits') {
            console.log('per_euro_credits', setting.value);
            setPerEuroCredit(setting.value);
          }
        }
      }
    } else {
      setSelectedPaymentGateway(null);
    }
  }, [isFocused]);

  const onPaymentGatwayItemPress = (paymentItem) => {
    console.log("paymentItem", paymentItem);
    setSelectedPaymentGateway(paymentItem);
    setSelectedPackage(null);
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
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={appLabels.purchase}
      />
      <ScrollView>
        {selectedPaymentGateway != null ? (
          <>
            <View style={{ paddingHorizontal: 15 }}>
              <BackHeader title={"Choose your package size"} onBackPress={() => setSelectedPaymentGateway(null)} />
              <Image
                style={[styles.paymetGatewayImage, { alignSelf: 'center' }]}
                source={{ uri: selectedPaymentGateway.picture }} />

              {selectedPaymentGateway.packagemodules && (
                <>
                  <FlatList
                    data={selectedPaymentGateway.packagemodules}
                    contentContainerStyle={{ paddingTop: 20 }}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={String(index)}
                        onPress={() => onSelectPackageModule(item)}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 10,
                          marginBottom: 10,
                          backgroundColor: selectedPackage ? selectedPackage.id === item.id ? Colors.ui_primary : Colors.white : Colors.white,
                          borderRadius: 5
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image style={styles.coinIcon} source={Icons.coins_icon} />
                          <AppText
                            type={'bold'}
                            size={16}
                            color={selectedPackage ? selectedPackage.id === item.id ? Colors.white : Colors.black : Colors.black}>
                            {`${perEuroCredit * item.price} credits`}
                          </AppText>
                        </View>
                        <View>
                          <AppText
                            type={'bold'}
                            size={16}
                            color={selectedPackage ? selectedPackage.id === item.id ? Colors.white : Colors.black : Colors.black}>
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
        ) : (
            <>
              {loadingPaymentGateways && paymentGateways.length === 0 ? (<AppIndicatorLoader />) : (
                <FlatList
                  data={paymentGateways}
                  numColumns={2}
                  contentContainerStyle={{ paddingTop: 20 }}
                  renderItem={({ item, index }) => (
                    <PaymentGatwayItem
                      key={String(index)}
                      imageUrl={item.picture}
                      onPress={() => onPaymentGatwayItemPress(item)}
                    />
                  )}
                  keyExtractor={(item, index) => String(index)}
                />
              )}
            </>
          )}
      </ScrollView>
    </View>
  );
};

const PaymentGatwayItem = ({ onPress, imageUrl }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', marginTop: 10 }}
      onPress={onPress}>
      <Image style={styles.paymetGatewayImage} source={{ uri: imageUrl }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paymetGatewayImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  coinIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginEnd: 5
  }
});

export default CoinPurchase;
