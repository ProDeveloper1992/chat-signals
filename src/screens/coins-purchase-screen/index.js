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
import { CoinGradientIcon } from '../../constants/svg-icons';

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
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {loadingPaymentGateways && paymentGateways.length === 0 ? (<AppIndicatorLoader />) : (
          <View>
            <AppText type={'bold'} size={16}>{"step 1 - Payment method"}</AppText>
            <FlatList
              data={paymentGateways}
              numColumns={3}
              contentContainerStyle={{ paddingTop: 20 }}
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
          </View>
        )}
        {selectedPaymentGateway != null && (
          <>
            <View>
              <AppText type={'bold'} size={16}>{"step 2 - Choose your package size"}</AppText>
              <OwnPurchaseCard
                sliderCount={ownPackagePrice}
                minimumSliderCount={0}
                maximumSliderCount={500}
                onChangeSliderValue={(value) => onChangeOwnPackagePrice(value)}
                creditPerCurrency={perEuroCredit}
                paymentUrl={selectedPaymentGateway.payment_url} />

              {selectedPaymentGateway.packagemodules && (
                <>
                  <FlatList
                    data={selectedPaymentGateway.packagemodules}
                    contentContainerStyle={{ paddingTop: 20 }}
                    numColumns={3}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={String(index)}
                        onPress={() => onSelectPackageModule(item)}
                        style={{
                          width: 110,
                          height: 110,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          margin: 10,
                          backgroundColor: Colors.white,
                          borderRadius: 20,
                          borderWidth: 3,
                          borderColor: selectedPackage ? selectedPackage.id === item.id ? Colors.ui_primary : Colors.grey_light : Colors.grey_light,
                          shadowColor: 'black',
                          shadowOffset: { width: 0, height: 1 },
                          shadowRadius: 2,
                          shadowOpacity: 0.2,
                          elevation: 2
                        }}>
                        <View style={{ alignItems: 'center' }}>
                          <CoinGradientIcon />
                          <AppText
                            type={'medium'}
                            size={12}
                            color={Colors.black}>
                            {`${perEuroCredit * item.price} Coins`}
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
  }
});

export default CoinPurchase;
