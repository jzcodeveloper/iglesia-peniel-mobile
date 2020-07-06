import React from 'react';
import styled from 'styled-components/native';

import buttons from '../../data/about';

import ButtonWithBackground from '../../components/common/button_with_background';

const Container = styled.View`
  flex: 1;
`;

const FlatList = styled.FlatList`
  padding: 25px;
`;

const Heading = styled.Text`
  font-size: 20px;
  color: #444444;
  padding: 0 0 10px 0;
  letter-spacing: 1px;
`;

const About = ({navigation}) => {
  const onPress = (screen) => {
    navigation.push(screen);
  };

  return (
    <Container>
      <FlatList
        data={buttons}
        enableEmptySections={true}
        keyExtractor={(item) => item.screen}
        contentContainerStyle={{paddingBottom: 40}}
        renderItem={({item: {title, source, caption, screen}}) => (
          <>
            {title ? <Heading>{title}</Heading> : null}

            <ButtonWithBackground
              source={source}
              caption={caption}
              onPress={onPress.bind(null, screen)}
            />
          </>
        )}
      />
    </Container>
  );
};

export default About;
