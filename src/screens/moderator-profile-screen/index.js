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
        return (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No photos Found!</Text>
          </View>
        );

      case 1:
        return (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Profile Info Tab</Text>
          </View>
        );

      case 2:
        return (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Action Tab</Text>
          </View>
        );
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
      </View>

      <View style={{height: 0.3, backgroundColor: 'grey'}}></View>

      <View style={styles.moderatorSwitchContainer}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 7.5,
                backgroundColor: 'grey',
                marginRight: 5,
              }}></View>
            <Text
              style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>
              {params.item.name}
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginVertical: 3}}>
            <Text style={{marginRight: 10}}>{'Distance'}</Text>
            <Text style={{marginRight: 10}}>{'Country'}</Text>
            <Image
              source={Icons.chat_active}
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
          onIconPress={() => alert('Kiss')}
          txtColor={'red'}
          IconName={'Kisses'}
          Icon={Icons.kiss_icon}
        />

        <IconLabel
          onIconPress={() => alert('Like')}
          txtColor={'blue'}
          IconName={'Like'}
          Icon={Icons.like_icon}
        />

        <IconLabel
          onIconPress={() => alert('Chat')}
          txtColor={'#FFD700'}
          IconName={'Chat'}
          Icon={Icons.chat_flat_icon}
        />

        <IconLabel
          onIconPress={() => alert('Add friend')}
          txtColor={'green'}
          IconName={'Add Friend'}
          Icon={Icons.add_friend_icon}
        />
      </View>

      <View style={{height: 0.3, backgroundColor: 'grey'}}></View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: Colors.greydark,
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
            borderColor: Colors.greydark,
            backgroundColor:
              cuurentTab === 1 ? Colors.ui_primary_dark : Colors.white,
          }}
          onPress={() => setCurrentTab(1)}>
          <Text
            style={{
              color: cuurentTab === 1 ? Colors.white : Colors.black,
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
          }}
          onPress={() => setCurrentTab(2)}>
          <Text
            style={{
              color: cuurentTab === 2 ? Colors.white : Colors.black,
            }}>
            Action
          </Text>
        </TouchableOpacity>
      </View>

      {renderCurrentTab()}
    </ScrollView>
  );
}

const Header = (props) => {
  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.flexOne}>
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

      <View style={styles.flexOne}>
        <Text style={styles.headerTitle}>{props.label}</Text>
      </View>

      <View style={styles.flexOne}></View>
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
        <Text style={{color: props.txtColor, paddingTop: 10}}>
          {props.IconName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
