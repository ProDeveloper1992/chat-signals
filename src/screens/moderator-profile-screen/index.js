import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {NoListData} from '../../components';
import {Icons, Colors} from '../../constants';
import styles from './style';

export default function ModeratorProfile(props) {
  const {params} = props.route;

  const [isEnabled, setIsEnabled] = useState(false);
  const [cuurentTab, setCurrentTab] = useState(0);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const renderCurrentTab = () => {
    switch (cuurentTab) {
      case 0:
        return <NoListData title={'No photos found!'} />;

      case 1:
        return <NoListData title={'No profile information found!'} />;

      case 2:
        return <NoListData title={'No actions found!'} />;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode="cover"
          source={{uri: params.item.image_url}}>
          <Header
            label={params.item.name}
            onBackPress={() => props.navigation.goBack()}
          />
        </ImageBackground>

        <View style={{height: 0.3, backgroundColor: 'grey'}}></View>

        <View style={styles.moderatorSwitchContainer}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <View style={styles.onlineStatusSignal(params.item.is_online)} />
              <Text
                style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>
                {params.item.name}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 3}}>
              <Text style={{marginRight: 10}}>{'5 km'}</Text>
              <Text style={{marginRight: 10}}>{'Germany'}</Text>
              <Image
                source={{
                  uri:
                    'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png',
                }}
                style={{
                  height: 16,
                  width: 16,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>

          <View style={styles.switchViewContainer}>
            <Switch
              trackColor={{false: '#e0e0e0', true: Colors.ui_primary_dark}}
              thumbColor={isEnabled ? Colors.white : Colors.white}
              ios_backgroundColor={Colors.white_80}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={{fontSize: 14, fontWeight: '700'}}>BOOKMARK</Text>
          </View>
        </View>

        <View style={{height: 0.3, backgroundColor: 'grey'}}></View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <IconLabel
            onIconPress={() => {}}
            IconName={'Kisses'}
            Icon={Icons.kiss_icon}
          />

          <IconLabel
            onIconPress={() => {}}
            IconName={'Like'}
            Icon={Icons.like_icon}
          />

          <IconLabel
            onIconPress={() => {}}
            IconName={'Chat'}
            Icon={Icons.chat_flat_icon}
          />

          <IconLabel
            onIconPress={() => {}}
            IconName={'Add Friend'}
            Icon={Icons.add_friend_icon}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: Colors.grey,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              alignItems: 'center',
              backgroundColor:
                cuurentTab === 0 ? Colors.ui_primary_dark : Colors.white,
            }}
            onPress={() => setCurrentTab(0)}>
            <Text
              style={{
                color: cuurentTab === 0 ? Colors.white : Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Photos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              alignItems: 'center',
              borderRightWidth: 0.5,
              borderLeftWidth: 0.5,
              borderColor: Colors.grey,
              backgroundColor:
                cuurentTab === 1 ? Colors.ui_primary_dark : Colors.white,
            }}
            onPress={() => setCurrentTab(1)}>
            <Text
              style={{
                color: cuurentTab === 1 ? Colors.white : Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Profile-Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              alignItems: 'center',
              backgroundColor:
                cuurentTab === 2 ? Colors.ui_primary_dark : Colors.white,
              fontSize: 16,
              fontWeight: 'bold',
            }}
            onPress={() => setCurrentTab(2)}>
            <Text
              style={{
                color: cuurentTab === 2 ? Colors.white : Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Action
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{minHeight: 200}}>{renderCurrentTab()}</View>
      </View>
    </ScrollView>
  );
}

const Header = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <TouchableOpacity
          onPress={props.onBackPress}
          style={{
            backgroundColor: Colors.black_30,
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            height: 30,
            width: 30,
          }}>
          <Image style={styles.backIcon} source={Icons.back_icon} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.headerTitle}>{props.label}</Text>
      </View>

      <View />
    </View>
  );
};

const IconLabel = (props) => {
  return (
    <TouchableOpacity onPress={props.onIconPress}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          alignItems: 'center',
        }}>
        <Image
          source={props.Icon}
          style={{height: 35, width: 35, resizeMode: 'cover'}}
        />
        <Text style={{color: Colors.black, paddingTop: 10}}>
          {props.IconName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
