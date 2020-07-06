import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import authors from '../../data/authors';

const IMAGE_HEIGHT = (Dimensions.get('window').width * 2) / 5;

const Container = styled.View`
  width: 100%;
`;

const FlatList = styled.FlatList``;

const Images = styled.View`
  margin-top: 25px;
`;

const Image = styled.Image`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
`;

const Title = styled.Text`
  font-size: 30px;
  color: #444444;
  letter-spacing: 1px;
  padding: 25px 25px 0 25px;
  text-align: justify;
`;

const Subtitle = styled.Text`
  font-size: 24px;
  color: #444444;
  letter-spacing: 1px;
  padding: 25px 25px 0 25px;
  text-align: justify;
`;

const Text = styled.Text`
  font-size: 20px;
  color: #444444;
  letter-spacing: 1px;
  padding: 25px 25px 0 25px;
  text-align: justify;
  line-height: 30px;
`;

const Author = styled.View`
  padding: 25px;
  flex-direction: row;
  align-items: center;
`;

const AuthorImage = styled.Image`
  width: 250px;
  height: 250px;
  border-radius: 125px;
  margin-left: 25px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.5);
`;

const AuthorName = styled.Text`
  flex: 1;
  font-size: 24px;
  font-style: italic;
  text-align: center;
  color: #666666;
  letter-spacing: 1px;
`;

const Article = ({image, title, author, content}) => {
  return (
    <Container>
      <FlatList
        data={content}
        enableEmptySections={true}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{paddingBottom: 25}}
        renderItem={({item: {image, title, text}}) => (
          <Container>
            {image ? (
              <Images>
                <Image source={image} />
              </Images>
            ) : null}
            {title ? <Subtitle>{title}</Subtitle> : null}
            <Text>{text}</Text>
          </Container>
        )}
        ListHeaderComponent={
          <>
            <Image
              source={image || require('../../assets/images/article.jpg')}
            />
            {title ? <Title>{title}</Title> : null}
          </>
        }
        ListFooterComponent={
          author && authors[author] ? (
            <Author>
              <AuthorName>
                {authors[author].designation &&
                  authors[author].designation + '\n'}
                {authors[author].name}
              </AuthorName>
              <AuthorImage source={authors[author].image} />
            </Author>
          ) : null
        }
      />
    </Container>
  );
};

Article.defaultProps = {
  image: '',
  title: '',
  author: '',
  content: [],
};

export default Article;
