import React from 'react';
import styled from 'styled-components/native';
import {Platform, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Overlay from '../overlay';

const TouchableOpacity = styled.TouchableOpacity``;

const TouchableNativeFeedback = styled.TouchableNativeFeedback``;

const Container = styled.View`
  width: 100%;
  height: 75px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  elevation: 3;
`;

const View = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Caption = styled.Text`
  font-size: 20px;
  color: #ffffff;
  margin-left: 20px;
  letter-spacing: 1px;
`;

const StyledIcon = styled(Icon)`
  margin-right: 20px;
`;

const ButtonWithBackground = ({source, caption, onPress}) => {
  return (
    <Container>
      <Background source={source}>
        <Overlay transparency={0.6} />
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedback onPress={onPress}>
            <View>
              <Caption>{caption}</Caption>
              <StyledIcon name="chevron-right" size={30} color="#ffffff" />
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableOpacity onPress={onPress}>
            <View>
              <Caption>{caption}</Caption>{' '}
              <StyledIcon name="chevron-right" size={30} color="#ffffff" />
            </View>
          </TouchableOpacity>
        )}
      </Background>
    </Container>
  );
};

export default ButtonWithBackground;
