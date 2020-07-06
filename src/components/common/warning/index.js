import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import Button from '../button';

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fbfbfb;
  overflow: hidden;
  z-index: 10;
`;

const Title = styled.Text`
  width: 100%;
  font-size: 30px;
  color: #fbfbfb;
  letter-spacing: 1px;
  background-color: #2d1b58;
  padding: 20px;
`;

const Description = styled.Text`
  font-size: 20px;
  padding: 20px;
  color: #444444;
  letter-spacing: 1px;
  text-align: justify;
`;

const Caption = styled.Text`
  font-size: 20px;
  color: ${(props) => props.color || '#444444'};
  letter-spacing: 1px;
  text-align: center;
  padding: 10px;
`;

const Row = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Margin = styled.Text`
  margin: 0 10px;
`;

const Warning = ({isVisible, title, description, onCancel, onAccept}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationInTiming={300}
      animationOut="slideOutDown"
      animationOutTiming={300}
      onBackdropPress={onCancel}
      useNativeDriver={true}>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Row>
          <Button onPress={onCancel} bgColor="#f0f4f7">
            <Caption>Cancelar</Caption>
          </Button>
          <Margin />
          <Button onPress={onAccept} bgColor="#2d1b58">
            <Caption color="#fbfbfb">Eliminar</Caption>
          </Button>
        </Row>
      </Container>
    </Modal>
  );
};

export default Warning;
