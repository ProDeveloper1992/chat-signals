import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppText, GradientButton } from '..';
import { Colors } from '../../constants';
import { getSealUrl } from '../../redux/actions/app-actions';
import OwnPackageSlider from '../own-package-slider'
import { WebViewModal } from '../app-modals';

export default function OwnPurchaseCard({
    creditPerCurrency,
    sliderCount,
    minimumSliderCount,
    maximumSliderCount,
    onChangeSliderValue,
    paymentUrl }) {

    const dispatch = useDispatch();

    const { generalSettings, gettingSealUrl } = useSelector((state) => state.appState);
    const { userData } = useSelector((state) => state.userState);

    const [paymentWebViewVisible, setPaymentWebViewVisible] = useState(false);
    const [finalPaymentUrl, setFinalPaymentUrl] = useState(null);

    const onOrderPurchasePress = async () => {
        if (generalSettings.length > 0) {

            let project_identifier_key = '';
            let access_key = '';
            let testmode = '';
            let payment_url = '';
            let payment_amount = 0;

            for (let setting of generalSettings) {
                if (setting.name === 'project_identifier_key') {
                    project_identifier_key = setting.value;
                }
                if (setting.name === 'access_key') {
                    access_key = setting.value;
                }
                if (setting.name === 'testmode') {
                    testmode = setting.value;
                }
            }

            console.log('testmode', testmode);
            console.log('access_key', access_key);
            console.log('project_identifier_key', project_identifier_key);
            console.log("generalSettings", generalSettings);
            console.log("Order Amount", sliderCount);
            console.log("userId", userData.id);
            // console.log("paymentUrl", paymentUrl + `?project=${project_identifier_key}&title=Micropayment+immediately.&testmode=${testmode}&customer=${userData.id}&seal=&country=DE`);
            payment_amount = sliderCount * 100;
            payment_url = paymentUrl + `?project=${project_identifier_key}&title=Micropayment+immediately.&amount=${payment_amount}&testmode=${testmode}&customer=${userData.id}&seal=&country=DE`;
            // "https://directbanking.micropayment.de/sofort/event/?project=12t5-lgain-9dc0a1f7&title=Micropayment+immediately.&testmode=1&customer=20&seal=&country=DE"
            let sealRequestData = {
                accessKey: access_key,
                url: payment_url
            }
            const seal_response = await dispatch(getSealUrl(sealRequestData));
            if (seal_response.meta.status) {
                console.log(seal_response.data.sear_url);
                setFinalPaymentUrl(seal_response.data.sear_url);
                setPaymentWebViewVisible(true);
                // console.log(payment_url);
                // console.log("https://call2pay.micropayment.de/call2pay/event/?project=12t5-lgain-9dc0a1f7&title=Micropayment+Call2Pay&amount=5500&testmode=1&customer=28&seal=5caac32ccb74e8e9307feb11b49a167e&country=DE")
            }
        }
    }

    return (
        <>
            <View style={styles.container}>
                <AppText type={'bold'} size={18} style={{ textAlign: 'center' }}>{'Own Package'}</AppText>
                <AppText size={12} style={{ textAlign: 'center' }}>{"How many credits would you like to have? - Here you have it in your own hands!"}</AppText>
                <OwnPackageSlider
                    value={sliderCount}
                    minimumValue={minimumSliderCount}
                    maximumValue={maximumSliderCount}
                    onValueChange={onChangeSliderValue}
                    trackStyle={customStyles4.track}
                    thumbStyle={customStyles4.thumb}
                    thumbTintColor={Colors.ui_primary}
                />
            </View>
            <GradientButton
                disabled={sliderCount === 0 ? true : false}
                type={'positive'}
                style={{ marginTop: 20 }}
                title={`Order for ${sliderCount}€ for fee`}
                onPress={onOrderPurchasePress}
                loading={gettingSealUrl}
            />
            <AppText size={12} style={{ marginVertical: 10, textAlign: 'center' }}>{`You will be credited ${sliderCount * creditPerCurrency} credits after purchase .`}</AppText>
            <WebViewModal
                paymentUrl={finalPaymentUrl}
                visible={paymentWebViewVisible}
                onHideModal={() => setPaymentWebViewVisible(false)} />
        </>
    );
}

var customStyles4 = StyleSheet.create({
    track: {
        height: 15,
        borderRadius: 15 / 2,
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.grey,
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
        borderColor: Colors.ui_primary_dark,
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
