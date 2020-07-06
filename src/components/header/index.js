import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {selectAuthenticated} from '../../store/user/selectors';
import {logoutUserRequest} from '../../store/user/actions';

import Header from '../common/header';
import Button from '../common/button';
import {Arch, Arch2} from '../../assets/icons';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Vector = styled.View`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 0;
  width: 100%;
  z-index: ${(props) => props.zIndex};
`;

const HomeHeader = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const authenticated = useSelector(selectAuthenticated);

  const onPress = () => {
    if (authenticated) {
      dispatch(logoutUserRequest());
    } else {
      navigation.push('Administrador');
    }
  };

  return (
    <Container>
      <Vector top={-120} zIndex={2}>
        <Arch width="100%" />
      </Vector>

      <Vector top={-115} zIndex={1}>
        <Arch2 width="100%" />
      </Vector>

      <Header
        right={
          <Button onPress={onPress}>
            <View>
              <Icon
                name={authenticated ? 'sign-out' : 'sign-in'}
                size={30}
                color="#ffffff"
              />
            </View>
          </Button>
        }
      />
    </Container>
  );
};

export default HomeHeader;
