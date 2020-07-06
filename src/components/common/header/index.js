import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #2d1b58;
  z-index: 2;
`;

const Left = styled.View`
  flex: 0.3;
`;

const Middle = styled.View`
  flex: 1;
`;

const Right = styled.View`
  flex: 0.3;
`;

const Heading = styled.Text`
  color: #ffffff;
  font-size: 22px;
  text-align: center;
`;

const Header = ({left, title, right}) => {
  return (
    <Container>
      <Left>{left}</Left>
      <Middle>
        <Heading>{title}</Heading>
      </Middle>
      <Right>{right}</Right>
    </Container>
  );
};

Header.defaultProps = {
  title: '',
};

export default Header;
