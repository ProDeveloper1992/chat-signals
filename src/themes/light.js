import {DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'black',
    primary: '#F54B64', //#F78361
    positive: '#98ff67',
    white: '#ffffff',
    black: '#242E38',
    greydark: '#4E586E',
  },
};
