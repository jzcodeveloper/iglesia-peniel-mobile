import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

import Form from '../../components/common/form';

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
`;

const Modal = ({navigation, route: {name, params}}) => {
  const onSuccess = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView>
        <Form {...params} onSuccess={onSuccess} />
      </ScrollView>
    </Container>
  );
};

export default Modal;
