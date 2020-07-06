import React from 'react';
import styled from 'styled-components/native';

import mission from '../../data/mission';

import Article from '../../components/article';
import Grid from '../../components/common/grid';

const Container = styled.View`
  flex: 1;
`;

const FlatList = styled.FlatList`
  padding: 25px;
`;

const Mission = () => {
  return (
    <Container>
      <FlatList
        data={mission}
        enableEmptySections={true}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{paddingBottom: 25}}
        renderItem={({item: {title, description}}) => (
          <Grid title={title} description={description} />
        )}
      />
    </Container>
  );
};

export default Mission;
