import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';

export default StyleSheet.create({
  modalContainer: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalSubContainer: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    color: Colors.ui_primary_dark,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
