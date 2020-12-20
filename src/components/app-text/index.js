import styled from 'styled-components/native';
import { Colors } from '../../constants';
import PropTypes from 'prop-types';

const getFontFamily = (type) => {
  switch (type) {
    case 'regular':
      return 'Gilroy-Regular';
    case 'medium':
      return 'Gilroy-Medium';
    case 'bold':
      return 'Gilroy-Bold';
    case 'heavy':
      return 'Gilroy-Heavy';
    case 'light':
      return 'Gilroy-Light';
    default:
      return 'Gilroy-Regular';
  }
};

export const AppText = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => getFontFamily(props.type)}
  color: ${(props) => props.color};
  text-transform: ${(props) => props.uppercase ? 'uppercase' : 'none'};
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
