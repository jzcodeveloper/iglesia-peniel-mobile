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
  aspect-ratio: 1.7;
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

const Donations = () => {
  return (
    <Container>
      <ScrollView>
        <Text>
          Realiza todos tus diezmos y ofrendas a los siguientes números de
          cuenta.
        </Text>
        <Text>
          "Cada uno de como propuso en su corazón: no con tristeza, ni por
          necesidad, porque Dios ama al dador alegre" (2 Corintios 9:7).
        </Text>
        <View>
          <Image>
            <Background source={require('../../assets/images/donations.png')} />
            <Overlay transparency={0.2} />
          </Image>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Donations;
