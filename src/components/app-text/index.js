import styled from 'styled-components/native';
import { Colors } from '../../constants';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { getFontFamily } from '../../utils/common';

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
