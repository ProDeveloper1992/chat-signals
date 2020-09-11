import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Text, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FlirtTab = (props) => {
  const [FlatListItems, getFlatListItem] = useState([
    {id: '1', value: 'A', is_online: false},
    {id: '2', value: 'B', is_online: true},
    {id: '3', value: 'C', is_online: false},
    {id: '4', value: 'D', is_online: false},
    {id: '5', value: 'E', is_online: true},
    {id: '6', value: 'F', is_online: false},
    {id: '7', value: 'G', is_online: true},
    {id: '8', value: 'H', is_online: false},
    {id: '9', value: 'I', is_online: false},
    {id: '10', value: 'J', is_online: true},
    {id: '11', value: 'K', is_online: false},
    {id: '12', value: 'L', is_online: true},
    {id: '13', value: 'M', is_online: false},
    {id: '14', value: 'N', is_online: true},
    {id: '15', value: 'O', is_online: false},
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={FlatListItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flex: 1 / 2,
              // flex: 1,
              // alignSelf:'center'
              height: 200,
              width: 200,
              // borderRadius: 8,
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor: 'green',
              // margin: 5,
            }}
            onPress={() => alert(123)} activeOpacity={0.6}>
            <ImageBackground
              style={{
                flex: 1,
                // height: 200,
                borderRadius: 8,
                alignItems: 'center',
                // justifyContent: 'flex-end',
                backgroundColor: 'grey',
                margin: 5,
              }}
              resizeMode={'cover'}
              imageStyle={{borderRadius: 5}}
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

                <Text style={{color: 'black', fontSize: 12}}>
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
    paddingVertical: 5,
  },
});

export default FlirtTab;
