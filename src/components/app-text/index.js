import styled from 'styled-components/native';
import { Colors } from '../../constants';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';

const getFontFamily = (type) => {
  switch (type) {
    case 'regular':
      return 'Poppins-Regular';
    case 'medium':
      return 'Poppins-Medium';
    case 'bold':
      return 'Poppins-Bold';
    case 'heavy':
      return 'Poppins-Black';
    case 'light':
      return 'Poppins-Light';
    case 'bold-italic':
      return 'Poppins-BoldItalic';
    case 'black-italic':
      return 'Poppins-BlackItalic';
    default:
      return 'Poppins-Regular';
  }
};

export const AppText = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => getFontFamily(props.type)}
  color: ${(props) => props.color};
  text-transform: ${(props) => props.uppercase ? 'uppercase' : 'none'};
  top:${Platform.OS === 'ios' ? 0 : 2}px;
`;

AppText.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  uppercase: PropTypes.bool,

  type: PropTypes.oneOf(['regular', 'medium', 'bold', 'heavy', 'light', 'bold-italic', 'black-italic']),
};

AppText.defaultProps = {
  size: 14,
  color: Colors.black,
  type: 'regular',
  uppercase: false
};
