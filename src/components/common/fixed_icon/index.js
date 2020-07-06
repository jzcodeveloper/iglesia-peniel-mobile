import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../button';

const Container = styled.View`
  position: absolute;
  background-color: ${(props) => props.bgColor};
  ${(props) => (props.top ? `top: ${props.top};` : '')}
  ${(props) => (props.right ? `right: ${props.right};` : '')}
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : '')}
  ${(props) => (props.left ? `left: ${props.left};` : '')}
  width: 76px;
  height: 76px;
  border-radius: 38px;
  elevation: 5;
  overflow: hidden;
  z-index: 5;
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(Icon)``;

const FixedIcon = ({
  name,
  size,
  color,
  top,
  right,
  bottom,
  left,
  bgColor,
  onPress,
}) => {
  return (
    <Container
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      bgColor={bgColor}>
      <Button onPress={onPress}>
        <View>
          <StyledIcon name={name} size={size} color={color} />
        </View>
      </Button>
    </Container>
  );
};

FixedIcon.defaultProps = {
  name: '',
  size: 30,
  color: '#ffffff',
  bgColor: '#2d1b58',
};

export default FixedIcon;
