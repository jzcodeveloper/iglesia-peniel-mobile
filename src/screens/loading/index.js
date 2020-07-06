import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {fetchDoctypesRequest} from '../../store/doctypes/actions';
import {selectLoading} from '../../store/doctypes/selectors';

import Overlay from '../../components/common/overlay';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.Text`
  font-size: 30px;
  color: #fbfbfb;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Loading = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchDoctypesRequest());
    setTimeout(() => navigation.replace('Inicio'), 5000);
  }, []);

  return (
    <Container>
      <Background source={require('../../assets/images/loading.png')}>
        <Overlay transparency={0} />
      </Background>
    </Container>
  );
};

export default Loading;
