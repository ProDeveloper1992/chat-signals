import styled from 'styled-components/native';
import { Colors } from '../../constants';
import PropTypes from 'prop-types';

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
    default:
      return 'Poppins-Regular';
  }
};

export const AppText = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => getFontFamily(props.type)}
  color: ${(props) => props.color};
  text-transform: ${(props) => props.uppercase ? 'uppercase' : 'none'};
  top:2px;
`;

AppText.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  uppercase: PropTypes.bool,

  type: PropTypes.oneOf(['regular', 'medium', 'bold', 'heavy', 'light']),
};

AppText.defaultProps = {
  size: 14,
  color: Colors.black,
  type: 'regular',
  uppercase: false
};
