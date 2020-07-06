import React from 'react';
import styled from 'styled-components/native';

import Overlay from '../overlay';

const Container = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const ActivityIndicator = styled.ActivityIndicator``;

const Spinner = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#2d1b58" />
    </Container>
  );
};

export default Spinner;
