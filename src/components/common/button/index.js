import React from 'react';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import PropTypes from 'prop-types';

const TouchableOpacity = styled.TouchableOpacity``;

const TouchableNativeFeedback = styled.TouchableNativeFeedback``;

const View = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
`;

const Button = ({onPress, bgColor, children}) => {
  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback onPress={onPress}>
      <View bgColor={bgColor}>{children}</View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View bgColor={bgColor}>{children}</View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  bgColor: 'transparent',
};

export default Button;
