import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:50
  },

  propertyContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },

  subPropertyContainer: {
    flexDirection: 'row',
    flex: 1 / 2,
    alignItems: 'center',
  },

  iconView: {
    backgroundColor: '#cccddd',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    marginRight: 15,
    borderRadius: 2,
  },

  iconSize: {
    height: 10,
    width: 10,
  },

  txtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
  },
});
