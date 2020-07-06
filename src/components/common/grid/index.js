import React, {useState} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import FixedIcon from '../fixed_icon';
import Overlay from '../overlay';
import Button from '../button';
import Menu from '../menu';

const Container = styled.View`
  flex: 1;
  border-radius: 10px;
  margin-bottom: 25px;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const View = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 30px;
  color: #ffffff;
  letter-spacing: 1px;
`;

const Description = styled.Text`
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 1px;
  text-align: justify;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Left = styled.Text`
  color: #fbfbfb;
  font-size: 16px;
  letter-spacing: 1px;
`;

const Right = styled.Text`
  color: #fbfbfb;
  font-size: 16px;
  letter-spacing: 1px;
`;

const Grid = ({
  title,
  description,
  bottomLeft,
  bottomRight,
  source,
  onPress,
  menu,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const shouldShowMenu = () => {
    setShowMenu(true);
  };

  const shouldHideMenu = () => {
    setShowMenu(false);
  };

  return (
    <Container>
      <Background source={source}>
        <Overlay />
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
        <Button onPress={onPress}>
          <View>
            {title ? <Title>{title}</Title> : null}
            {description ? <Description>{description}</Description> : null}
            <Bottom>
              {bottomLeft ? <Left>{bottomLeft}</Left> : null}
              {bottomRight ? <Right>{bottomRight}</Right> : null}
            </Bottom>
          </View>
        </Button>
      </Background>
    </Container>
  );
};

Grid.defaultProps = {
  title: '',
  description: '',
  bottomLeft: '',
  bottomRight: '',
  source: require('../../../assets/images/grids/06.jpg'),
};

export default Grid;
