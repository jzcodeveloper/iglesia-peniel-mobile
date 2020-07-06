import React from 'react';
import styled from 'styled-components/native';

import history from '../../data/history';

import Article from '../../components/article';

const Container = styled.View`
  flex: 1;
`;

const History = () => {
  return (
    <Container>
      <Article
        image={history.image}
        title={history.title}
        content={history.content}
        author={history.author}
      />
    </Container>
  );
};

export default History;
