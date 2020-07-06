import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useInterval} from '../../hooks/customHooks';

import tabs from '../../data/tabs';
import images from '../../data/images';

import Header from '../../components/header';
import BottomTabs from '../../components/bottom_tabs';
import Overlay from '../../components/common/overlay';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Home = () => {
  const [index, setIndex] = useState(0);

  useInterval(() => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }, 5000);

  return (
    <Container>
      <Header />
      <Background source={images[index]}>
        <Overlay transparency={0} />
      </Background>
      <BottomTabs tabs={tabs} />
    </Container>
  );
};

export default Home;
