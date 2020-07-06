import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, ${(props) => props.transparency});
`;

const Overlay = ({transparency}) => {
  return <Container transparency={transparency} />;
};

Overlay.defaultProps = {
  transparency: 0.5,
};

export default Overlay;
