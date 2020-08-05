import {DarkTheme} from '@react-navigation/native';

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'black',
    text: 'white',
    primary: '#F54B64', //#F78361
    positive: '#98ff67',
    white: '#ffffff',
    black: '#242E38',
    greydark: '#4E586E',
  },
};
