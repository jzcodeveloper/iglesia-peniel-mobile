import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import Button from '../common/button';

const Container = styled.View`
  flex-direction: row;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 70px;
  width: 100%;
  background-color: #2d1b58;
`;

const FlatList = styled.FlatList``;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

const BottomTabs = ({tabs}) => {
  const navigation = useNavigation();

  const onPress = (screen) => {
    navigation.push(screen);
  };

  return (
    <Container>
      {tabs.map(({screen, icon, caption}) => (
        <Button key={screen} onPress={onPress.bind(null, screen)}>
          <View>
            <Icon name={icon} size={30} color="#ffffff" />
            <Text>{caption}</Text>
          </View>
        </Button>
      ))}
      {/* <FlatList
        horizontal
        data={tabs}
        enableEmptySections={true}
        keyExtractor={(item) => item.screen}
        renderItem={({item: {screen, icon, caption}}) => (
          <Button key={screen} onPress={onPress.bind(null, screen)}>
            <View>
              <Icon name={icon} size={30} color="#ffffff" />
              <Text>{caption}</Text>
            </View>
          </Button>
        )}
      /> */}
    </Container>
  );
};

export default BottomTabs;
