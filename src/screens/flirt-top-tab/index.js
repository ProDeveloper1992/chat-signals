import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, ImageBackground, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FlirtTab = (props) => {
  const [flirtsList, setFlirtsList] = useState([
    { id: '1', value: 'A', is_online: false },
    { id: '2', value: 'B', is_online: true },
    { id: '3', value: 'C', is_online: false },
    { id: '4', value: 'D', is_online: false },
    { id: '5', value: 'E', is_online: true },
    { id: '6', value: 'F', is_online: false },
    { id: '7', value: 'G', is_online: true },
  ]);

  // screen sizing
  const { width, height } = Dimensions.get('window');
  // orientation must fixed
  const SCREEN_WIDTH = width < height ? width : height;
  const SCREEN_HEIGHT = height > width ? height : width;

  const listColums = 2;
  const listRows = 3;
  const listItemMargin = 10;
  const listItemWidth = (SCREEN_WIDTH - (listColums + 1) * listItemMargin) / listColums
  const listItemHeight = (SCREEN_HEIGHT - (listRows + 1) * listItemMargin) / listRows

  return (
    <View style={styles.container}>
      <FlatList
        data={flirtsList}
        numColumns={listColums}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => alert(123)} activeOpacity={0.6}>
            <ImageBackground
              style={{
                flex: 1,
                marginLeft: listItemMargin,
                marginTop: 10,
                width: listItemWidth,
                height: listItemHeight,
              }}
              resizeMode={'cover'}
              imageStyle={{ borderRadius: 5 }}
              source={{
                uri:
                  'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  alignItems: 'center',
                  position: 'absolute',
                  left: 5,
                  top: 5,
                }}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    marginEnd: 5,
                    backgroundColor: item.is_online ? 'green' : 'red',
                  }}></View>

                <Text style={{ color: 'black', fontSize: 12 }}>
                  {item.is_online ? 'Online' : 'Offline'}
                </Text>
              </View>
              <View></View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FlirtTab;
