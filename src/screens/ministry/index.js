import React from 'react';
import styled from 'styled-components/native';

import ministries from '../../data/ministries';

import Article from '../../components/article';

const Container = styled.View`
  flex: 1;
`;

const Ministry = ({route: {name}}) => {
  return (
    <Container>
      <Article
        image={ministries[name].image}
        title={ministries[name].title}
        content={ministries[name].content}
        author={ministries[name].author}
      />
    </Container>
  );
};

export default Ministry;
