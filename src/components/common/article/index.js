import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Dimensions} from 'react-native';
import Modal from 'react-native-modal';

import FixedIcon from '../fixed_icon';
import Button from '../button';
import Menu from '../menu';

const IMAGE_HEIGHT = (Dimensions.get('window').width * 2) / 5;

const Container = styled.View`
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 25px;
  elevation: 3;
`;

const Image = styled.Image`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: transparent;
`;

const Content = styled.View`
  flex: 1;
  padding: 20px;
  position: relative;
`;

const Title = styled.Text`
  font-size: 30px;
  color: #444444;
  letter-spacing: 1px;
`;

const Description = styled.Text`
  font-size: 20px;
  color: #444444;
  letter-spacing: 1px;
  text-align: justify;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #2d1b58;
  padding: 15px;
  border-radius: 5px;
`;

const Text = styled.Text`
  font-size: 20px;
  color: #ffffff;
`;

const VideoPlayer = ({image, title, description, caption, menu, onPress}) => {
  const [showMenu, setShowMenu] = useState(false);

  const shouldShowMenu = () => {
    setShowMenu(true);
  };

  const shouldHideMenu = () => {
    setShowMenu(false);
  };

  return (
    <Container>
      {menu && (
        <FixedIcon
          name="ellipsis-v"
          size={30}
          color="#fbfbfb"
          top="0px"
          right="0px"
          bgColor="transparent"
          onPress={shouldShowMenu}
        />
      )}
      {menu && (
        <Modal
          isVisible={showMenu}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          onBackdropPress={shouldHideMenu}
          useNativeDriver={true}>
          <Menu
            title={title || description}
            options={menu}
            onPress={shouldHideMenu}
          />
        </Modal>
      )}
      <Image
        source={image || require('../../../assets/images/article.jpg')}></Image>
      <Bottom>
        <Content>
          <Title numberOfLines={1}>{title}</Title>
          <Description numberOfLines={3}>{description}</Description>
          <Button onPress={onPress}>
            <View>
              <Text>{caption}</Text>
            </View>
          </Button>
        </Content>
      </Bottom>
    </Container>
  );
};

export default VideoPlayer;
