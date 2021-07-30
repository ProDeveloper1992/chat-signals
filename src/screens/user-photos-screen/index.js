import React, { useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';

import { AppButton, AppText, BackHeader, NoListData, UserPhotoItem } from '../../components';
import { Colors } from '../../constants';
import styles from './style';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import { apiRoot } from '../../services/api-service';
import { showToast } from '../../redux/actions/app-actions';
import { getCustomerProfileDetail } from '../../redux/actions/user-actions';
import { toggleGallerySwiperModal } from '../../redux/actions/app-modals-actions';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function UserPhotos(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { userData, friendsList, authToken } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const [isUploading, setUploading] = useState(false)

    const onBackPress = () => {
        navigation.goBack();
    }


    const onUploadNewPress = () => {
        let options = {
            title: 'Select Option',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let sourceFull = response;
                console.log("sourceFull", sourceFull)
                try {

                    let fileName = Platform.OS === 'android' ? response.fileName : moment().unix() + '.jpg'
                    // let fileName = response.fileName
                    let PATH_TO_THE_FILE = Platform.OS == 'android' ? response.uri : response.origURL;

                    setUploading(true);
                    RNFetchBlob.fetch('POST', `${apiRoot}/customer_upload_photo`, {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'multipart/form-data',
                    }, [
                        {
                            name: 'picture',
                            filename: fileName,
                            type: response.type,
                            data: RNFetchBlob.wrap(PATH_TO_THE_FILE)
                        },
                        { name: 'customer_id', data: `${userData.id}` }
                    ]).then(async (resp) => {
                        console.log("resp", resp)
                        if (resp && resp.data) {
                            let parsedData = await JSON.parse(resp.data);
                            if (parsedData) {
                                if (parsedData.meta && parsedData.meta.status === true) {
                                    dispatch(showToast('positive', parsedData.meta.message));
                                    dispatch(getCustomerProfileDetail());
                                } else {
                                    dispatch(showToast('negative', parsedData.meta.message));
                                }
                            } else {
                                dispatch(showToast('negative', "Something went wrong! Try again!"))
                            }

                        }
                        setUploading(false);
                    }).catch((err) => {
                        setUploading(false);
                        console.log("err", err)
                    })
                } catch (e) {
                    console.log("e", e)
                    setUploading(false);
                }
            }
        })
    }

    const onPhotoPress = (item, index) => {
        let userPhotos = [];
        for (let photo of userData.profilepictures) {
            let photoObj = {
                url: photo.picture
            }
            userPhotos.push(photoObj);
        }
        dispatch(toggleGallerySwiperModal(true, userPhotos, index))
    }

    return (
        <View style={styles.container} pointerEvents={isUploading ? 'none' : 'auto'}>
            <BackHeader
                title={appLabels.photos}
                onBackPress={onBackPress}
                color={Colors.ui_primary}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(4), paddingTop: wp(2) }}>
                <View style={{ flex: 1.2 }} >
                    <AppText type={"bold"} size={wp(4)}>{appLabels.photos}</AppText>
                </View>
                <AppButton
                    title={`+${appLabels.upload_new}`}
                    onPress={onUploadNewPress}
                    style={{ flex: 0.8, alignSelf: 'flex-end' }}
                    loading={isUploading}
                />
            </View>
            <FlatList
                contentContainerStyle={{ flexGrow: 1, padding: wp(3) }}
                data={userData && userData.profilepictures && userData.profilepictures.length > 0 ? userData.profilepictures : []}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={String(index)} style={{ flex: index == userData.profilepictures.length - 1 && index % 2 == 0 ? 0.5 : 1 }}>
                        <UserPhotoItem item={item} onItemPress={() => onPhotoPress(item, index)} />
                    </View>
                )}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={<NoListData title={"No photos found!"} />}
            />
        </View>
    )
}