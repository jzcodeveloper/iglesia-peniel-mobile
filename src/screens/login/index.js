import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {selectUser} from '../../store/user/selectors';
import {loginUserRequest} from '../../store/user/actions';

import Form from '../../components/common/form';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) navigation.goBack();
  }, [user]);

  const onSubmit = (state) => {
    if (state.username && state.password) {
      dispatch(loginUserRequest(state));
    }
  };

  return (
    <Container>
      <Form
        title="Iniciar Sesión"
        caption="Ingresar"
        doctype="User"
        docname="New User"
        onSubmit={onSubmit}
      />
    </Container>
  );
};

export default Login;
