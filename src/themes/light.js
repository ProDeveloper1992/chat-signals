import {DefaultTheme} from '@react-navigation/native';
import {Colors} from '../constants'

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    primary: Colors.ui_primary,
    text: 'black',
  },
};