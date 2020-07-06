import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../button';

const Container = styled.View`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 10px;
  overflow: hidden;
`;

const FlatList = styled.FlatList``;

const Title = styled.Text`
  padding: 20px;
  font-size: 30px;
  color: #fbfbfb;
  letter-spacing: 1px;
  background-color: #2d1b58;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const StyledIcon = styled(Icon)`
  width: 45px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: #444444;
  letter-spacing: 1px;
`;

const Menu = ({title, options, onPress}) => {
  const onLocalPress = (fn) => {
    onPress();
    fn();
  };

  return (
    <Container>
      <Title numberOfLines={3}>{title}</Title>
      <FlatList
        data={options}
        enableEmptySections={true}
        keyExtractor={(item) => item.label}
        renderItem={({item: {icon, label, onPress}}) => (
          <Button onPress={onLocalPress.bind(null, onPress)}>
            <Row>
              <StyledIcon name={icon} size={30} color="#2d1b58" />
              <Text>{label}</Text>
            </Row>
          </Button>
        )}
      />
    </Container>
  );
};

export default Menu;
