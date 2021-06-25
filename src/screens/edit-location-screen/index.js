import React, { useState } from 'react';
import { TouchableOpacity, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, BackHeader, AuthInput, AppButton } from '../../components';
import { Colors, GOOGLE_MAP_API_KEY } from '../../constants';
import { SearchIcon, LocationIcon } from '../../constants/svg-icons';
import { editAccountInfo } from '../../redux/actions/user-actions';
import styles from './style';

export default function EditLocation(props) {

    const dispatch = useDispatch();

    const { appLabels } = useSelector((state) => state.appState);
    const { userData } = useSelector((state) => state.userState);

    let customer_location = null;

    if (userData && userData.location_name != null) {
        customer_location = {
            name: userData.location_name,
            formatted_address: userData.location_name,
            geometry: {
                location: {
                    lat: userData.latitude,
                    lng: userData.longitude
                }
            },
            place_id: ''
        }
    }

    const [searchText, setSearchText] = useState('');
    const [searchedPlaces, setSearchedPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(customer_location);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const onDebounceText = (text) => {
        setLoading(true);
        fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=${GOOGLE_MAP_API_KEY}`
        ).then(async (response) => {
            let json = await response.json();
            if (json.status == 'OK') {
                setSearchedPlaces(json.results);
                setLoading(false);
                console.log("Results", json.results)
            }
        }).catch((error) => {
            setLoading(false);
            console.log("error", error)
        });
    }

    const onSelectPlace = (place) => {
        setSelectedPlace(place);
        setSearchedPlaces([]);
        setSearchText('');
    }


    const onSaveLocation = async () => {
        let requestData = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            dob: userData.dob,
            Gender: userData.Gender ? userData.Gender : '',
            description: userData.Description != null ? userData.Description : 'description',
            sexual_orientation: userData.sexual_orientation ? userData.sexual_orientation : '',
            passions: userData.passions,
            profile_id: userData.id,
            latitude: selectedPlace.geometry.location.lat,
            longitude: selectedPlace.geometry.location.lng,
            location_name: selectedPlace.name
        }
        setIsSaving(true);
        await dispatch(editAccountInfo(requestData));
        setIsSaving(false);
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <BackHeader title={"Location"} color={Colors.ui_primary} />
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
                {selectedPlace && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 10, borderRadius: 8, backgroundColor: Colors.ui_primary_10 }}>
                        <LocationIcon />
                        <AppText type={'medium'} size={16}>{selectedPlace.name}</AppText>
                    </View>
                )}
                <AuthInput
                    value={searchText}
                    isDebounce={true}
                    onDebounceText={(text) => onDebounceText(text)}
                    onChangeText={(text) => {
                        setSearchText(text)
                        if (text.length == 0) {
                            setSearchedPlaces([]);
                        }
                    }}
                    icon={<SearchIcon width={24} height={24} />}
                    placeholder={"Search here..."}
                />
                {loading && searchText.length > 0 && (
                    <ActivityIndicator size={'small'} color={Colors.ui_primary} />
                )}
                <FlatList
                    data={searchedPlaces}
                    renderItem={({ item, index }) => {
                        return <TouchableOpacity
                            key={String(index)}
                            onPress={() => onSelectPlace(item)}
                            style={{ marginBottom: 10, padding: 10, borderBottomWidth: 1, borderColor: Colors.grey, backgroundColor: selectedPlace && selectedPlace.place_id == item.place_id ? Colors.ui_primary_10 : Colors.transparent }}>
                            <AppText>{item.name}</AppText>
                            <AppText size={12} color={Colors.greydark}>{item.formatted_address}</AppText>
                        </TouchableOpacity>
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyExtractor={(item, index) => String(index)}
                />
                <AppButton
                    disabled={selectedPlace == null}
                    title={appLabels.save}
                    onPress={onSaveLocation}
                    style={{ marginVertical: 10 }}
                    loading={isSaving} />
            </View>
            <SafeAreaView />
        </View>
    )
}