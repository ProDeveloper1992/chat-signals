import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'yellow'
  },

  imgBackground: {
    height: 400,
    width: '100%',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  flexOne: {
    flex: 1,
  },

  backIcon: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
    tintColor: 'white',
  },

  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  moderatorSwitchContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding: 10,
  },

  switchViewContainer:{
    flexDirection:'row',
    alignItems:'center'
  }
});
