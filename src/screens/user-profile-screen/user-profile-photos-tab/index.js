import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { AppText } from '../../../components';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Icons } from '../../../constants';
import styles from './style';
import ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { toggleGallerySwiperModal } from '../../../redux/actions/app-modals-actions';

const listColums = 2;
const listRows = 3.5;
const listItemMargin = 10;
const listItemWidth =
  (SCREEN_WIDTH - (listColums + 1) * listItemMargin) / listColums;
const listItemHeight =
  (SCREEN_HEIGHT - (listRows + 1) * listItemMargin) / listRows;

let width = Dimensions.get('screen').width / 2 - 8;

export default function UserProfilePhotosTab(props) {

  const dispatch = useDispatch();

  const [photosList, setphotosList] = useState([
    {
      uri: 'https://picsum.photos/200',
      dimensions: { width: 1080, height: 1920 }
    },
    {
      uri: 'https://picsum.photos/300',
      dimensions: { width: 1080, height: 1920 }
    },
    {
      uri: 'https://picsum.photos/220',
      dimensions: { width: 1080, height: 1920 }
    },
    {
      uri: 'https://picsum.photos/240',
      dimensions: { width: 1080, height: 1920 }
    },
    {
      uri: 'https://picsum.photos/260',
      dimensions: { width: 1080, height: 1920 }
    },
  ]);
  const [filePath, setFilePath] = useState({});

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setFilePath(source);
      }
    });
  };

  const onImagePress = (index) => {
    dispatch(toggleGallerySwiperModal(true, photosList, index))
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={photosList}
        numColumns={2}
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            key={String(index)}
            style={{
              flex: 1 / 2,
              marginTop: 3,
              marginHorizontal: 2,
              width: listItemWidth,
              height: listItemHeight,
              backgroundColor: 'lightgrey',
            }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onImagePress(index)}>
              <Image
                source={{ uri: item.uri }}
                style={{ height: '100%', width: '100%' }}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
      />
      {/* <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={photosList}
        keyExtractor={(item, index) => String(index)}
        horizontal={false}
        numColumns={2}
        renderItem={({item, index}) => (
          <View
            key={String(index)}
            style={{
              width: width,
              height: width,
              margin: 4,
            }}>
            <Image
              source={{uri: item.image}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        )}
      /> */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 15,
          left: 15,
          backgroundColor: Colors.ui_primary_dark,
          borderRadius: 30,
          padding: 3,
        }}
        onPress={chooseFile}
        activeOpacity={0.8}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 30,
            borderColor: Colors.white_80,
            padding: 3,
          }}>
          <Image
            source={Icons.add_image_icon}
            style={{
              height: 22,
              width: 22,
              tintColor: Colors.white_80,
              margin: 4,
            }}
          />
        </View>
      </TouchableOpacity>

      {/* <Image
        source={{
          uri: 'data:image/jpeg;base64,' + filePath.data,
        }}
        style={styles.imageStyle}
      /> */}
      {filePath.uri && (
        <Image source={{ uri: filePath.uri }} style={styles.imageStyle} />
      )}
    </SafeAreaView>
  );
}
