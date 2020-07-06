import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {fetchDocumentsRequest} from '../../store/documents/actions';
import {selectDocument} from '../../store/documents/selectors';

import ArticleView from '../../components/article';

const Container = styled.View`
  flex: 1;
`;

const Article = ({navigation, route: {name, params}}) => {
  const dispatch = useDispatch();
  const documents = useSelector(
    selectDocument({model: 'Article', name: params.name}),
  );

  return (
    <Container>
      <ArticleView
        image={documents[0].image}
        title={documents[0].title}
        content={documents[0].content}
        author={documents[0].author}
      />
    </Container>
  );
};

export default Article;
