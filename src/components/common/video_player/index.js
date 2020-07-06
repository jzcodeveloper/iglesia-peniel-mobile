import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {Dimensions, StatusBar} from 'react-native';
import Modal from 'react-native-modal';
import Video from 'react-native-video';

/* import Orientation from 'react-native-orientation-locker'; */
import PlayerControls from '../player_controls';
/* import ProgressBar from '../progress_bar'; */

import FixedIcon from '../fixed_icon';
import Button from '../button';
import Menu from '../menu';
import {FullscreenClose, FullscreenOpen} from '../../../assets/icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMAGE_HEIGHT = SCREEN_WIDTH * (9 / 16);

const Container = styled.View`
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 25px;
  elevation: 3;
`;

const Background = styled.ImageBackground`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
`;

const StyledVideo = styled(Video)`
  background-color: ${(props) => (props.audioOnly ? 'transparent' : '#000000')};
  ${(props) =>
    props.fullscreen
      ? `height: ${SCREEN_WIDTH}px;
    width: ${SCREEN_HEIGHT}px;`
      : `height: ${IMAGE_HEIGHT}px;
    width: ${SCREEN_WIDTH}px;`}
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000c4;
`;

const FullscreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  ${(props) => (props.menu ? 'left: 5px;' : 'right: 5px;')}
  padding: 20px;
  align-self: flex-end;
  align-items: center;
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

const VideoPlayer = ({title, description, source, menu, poster}) => {
  const videoRef = useRef();

  const [state, setState] = useState({
    fullscreen: false,
    play: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });

  const [showMenu, setShowMenu] = useState(false);

  const shouldShowMenu = () => {
    setShowMenu(true);
  };

  const shouldHideMenu = () => {
    setShowMenu(false);
  };

  /* useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []); */

  return (
    <Container>
      {menu && !state.fullscreen && (
        <FixedIcon
          name="ellipsis-v"
          size={25}
          color="#fbfbfb"
          top="-2px"
          right="-10px"
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
      <Button onPress={showControls}>
        {poster && <Background source={poster} resizeMode="contain" />}
        <StyledVideo
          ref={videoRef}
          source={source}
          controls={false}
          resizeMode="contain"
          onLoad={onLoadEnd}
          onProgress={onProgress}
          onEnd={onEnd}
          paused={!state.play}
          audioOnly={!!poster}
        />
        {state.showControls && (
          <Overlay>
            <FullscreenButton
              menu={menu ? true : false}
              /* onPress={handleFullscreen} */
            >
              {state.fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
            </FullscreenButton>
            <PlayerControls
              onPlay={handlePlayPause}
              onPause={handlePlayPause}
              playing={state.play}
              showPreviousAndNext={false}
              showSkip={true}
              skipBackwards={skipBackward}
              skipForwards={skipForward}
            />
            {/* <ProgressBar
                currentTime={state.currentTime}
                duration={state.duration > 0 ? state.duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              /> */}
          </Overlay>
        )}
      </Button>
      <Bottom>
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Content>
      </Bottom>
    </Container>
  );

  /* function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setState((s) => ({...s, fullscreen: true})), StatusBar.setHidden(true))
      : (setState((s) => ({...s, fullscreen: false})),
        StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  } */

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({...state, play: false, showControls: true});
      return;
    }

    setState({...state, play: true});
    setTimeout(() => setState((s) => ({...s, showControls: false})), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 15);
    setState({...state, currentTime: state.currentTime - 15});
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 15);
    setState({...state, currentTime: state.currentTime + 15});
  }

  function onSeek(data) {
    videoRef.current.seek(data.seekTime);
    setState({...state, currentTime: data.seekTime});
  }

  function onLoadEnd(data) {
    setState((s) => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
    }));
  }

  function onProgress(data) {
    setState((s) => ({
      ...s,
      currentTime: data.currentTime,
    }));
  }

  function onEnd() {
    setState({...state, play: false});
    videoRef.current.seek(0);
  }

  function showControls() {
    state.showControls
      ? setState({...state, showControls: false})
      : setState({...state, showControls: true});
  }
};

export default VideoPlayer;
