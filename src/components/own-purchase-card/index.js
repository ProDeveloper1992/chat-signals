import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppText, AppButton } from '..';
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

    const { generalSettings, gettingSealUrl, appLabels } = useSelector((state) => state.appState);
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
            payment_url = paymentUrl + `?project=${project_identifier_key}&title=Micropayment+immediately.&amount=${payment_amount}&testmode=${testmode}&customer=${userData.id}&seal=&country=IN`;
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
                <AppText type={'bold'} size={18} style={{ textAlign: 'center' }}>{appLabels.own_package}</AppText>
                <AppText size={16} style={{ textAlign: 'center', marginVertical: 36 }}>{appLabels.own_package_description}</AppText>
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
            <AppButton
                disabled={sliderCount === 0 ? true : false}
                type={'primary'}
                style={{ marginTop: 20 }}
                title={appLabels.order_now}
                onPress={onOrderPurchasePress}
                loading={gettingSealUrl}
            />
            <AppText size={12} style={{ marginVertical: 10, textAlign: 'center' }}>{`${appLabels.you_will_be_credited} ${sliderCount * creditPerCurrency} ${appLabels.credits_after_purchase}`}</AppText>
            <WebViewModal
                paymentUrl={finalPaymentUrl}
                visible={paymentWebViewVisible}
                onHideModal={() => setPaymentWebViewVisible(false)} />
        </>
    );
}

var customStyles4 = StyleSheet.create({
    track: {
        height: 1,
        backgroundColor: Colors.grey,
        borderWidth: 0.5,
        borderColor: Colors.grey,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.15,
    },
    thumb: {
        width: 58,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.ui_primary,
        borderColor: Colors.white,
        borderWidth: 2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.35,
        elevation: 2
    }
});

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
});
