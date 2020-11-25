import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import {GeneralHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';
import {useDispatch} from 'react-redux';
import {Colors, Icons} from '../../constants';
import {AppText} from '../../components/app-text';
import styles from './style';
import {ChatListItem} from '../../components/app-list-items';

const Chat = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [chatData, setChatData] = React.useState([
    {
      key: 1,
      userName: 'u1',
      profileImage: 'https://picsum.photos/200',
      lastMessage: 'i am good',
      lastMessageTime: '17.58',
    },
    {
      key: 2,
      userName: 'User2',
      profileImage: 'https://picsum.photos/300',
      lastMessage: 'hi',
      lastMessageTime: '07.58',
    },
    {
      key: 3,
      userName: 'u3',
      profileImage: 'https://picsum.photos/450',
      lastMessage: 'finding nemo',
      lastMessageTime: '22.21',
    },
  ]);

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          flexGrow: 1,
          height: 0.5,
          marginHorizontal: 12,
          backgroundColor: Colors.ui_primary_dark,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GeneralHeader
        rightIcon={Icons.user_profile}
        onRightPress={() => {}}
        onLeftPress={() => {}}
        onLeftPress={() => navigation.navigate('UserProfile')}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        LanguageIcon={Icons.icon_languages}
        leftIcon={Icons.search}
        label={'Chat'}
      />
      <FlatList
        data={chatData}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ChatListItem
            onChatPress={() => navigation.navigate('ChatDetail',{item:item})}
            profileImage={{uri: item.profileImage}}
            userName={item.userName}
            lastMessage={item.lastMessage}
            lastMessageTime={item.lastMessageTime}
          />
        )}
        ItemSeparatorComponent={ItemSeparatorView}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Chat;
