import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

export default StyleSheet.create({
  modalContainer: {
    padding: 0,
    marginHorizontal: 50,
    marginVertical: 20,
    justifyContent: 'center',
  },
  modalSubContainer: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: Colors.ui_primary_dark,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
