import React from 'react';
import styled from 'styled-components/native';

import Overlay from '../../components/common/overlay';

const Container = styled.View`
  width: 100%;
`;

const ScrollView = styled.ScrollView``;

const Text = styled.Text`
  font-size: 20px;
  color: #444444;
  letter-spacing: 1px;
  padding: 25px 25px 0 25px;
  text-align: justify;
  line-height: 30px;
`;

const View = styled.View`
  padding: 25px;
  aspect-ratio: 0.82;
`;

const Image = styled.View`
  border-radius: 10px;
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Location = () => {
  return (
    <Container>
      <ScrollView>
        <Text>
          Estamos localizados en la Calle Vargas entre Campo Elías y Bermúdez
          #183,4019. Ciudad Ojeda municipio Lagunillas estado Zulia, Venezuela.
        </Text>
        <View>
          <Image>
            <Background source={require('../../assets/images/location.jpg')} />
            <Overlay transparency={0.2} />
          </Image>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Location;
