import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

import videos from '../../data/videos';

import {
  fetchDocumentsRequest,
  deleteDocumentsRequest,
} from '../../store/documents/actions';

import {selectDoctypeFields} from '../../store/doctypes/selectors';
import {
  selectDocuments,
  selectDocumentsStatus,
} from '../../store/documents/selectors';
import {selectAuthenticated} from '../../store/user/selectors';

import FixedIcon from '../../components/common/fixed_icon';
import Warning from '../../components/common/warning';
import Video from '../../components/common/video_player';
import Spinner from '../../components/common/spinner';

const Container = styled.View`
  flex: 1;
`;

const FlatList = styled.FlatList`
  padding: 25px;
`;

const Videos = ({navigation}) => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const doctypeFields = useSelector(selectDoctypeFields('Video'));
  const documents = useSelector(selectDocuments({model: 'Video'}));
  const documentsStatus = useSelector(selectDocumentsStatus);

  const [firstRender, setFirstRender] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [warning, setWarning] = useState({
    show: false,
    _id: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    if (documents.length === 0) {
      const query = {model: 'Video', limit: 1000};
      dispatch(fetchDocumentsRequest(query));
    }
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    const {loading, error} = documentsStatus;

    // show spinner
    if (loading && !error) {
    }
    // hide spinner and error notification
    if (!loading && error) {
      setRefreshing(false);
    }
    // hide spinner and success notification
    if (!loading && !error) {
      setRefreshing(false);
    }
  }, [documentsStatus]);

  const onRefresh = () => {
    setRefreshing(true);
    const query = {model: 'Video', limit: 1000};
    dispatch(fetchDocumentsRequest(query));
  };

  const onPress = () => {
    navigation.navigate('Formulario', {
      title: 'Nuevo Video',
      caption: 'Crear',
      doctype: 'Video',
      docname: 'New Video',
    });
  };

  const onEditPress = (docname) => {
    navigation.navigate('Formulario', {
      title: 'Modificar Video',
      caption: 'Modificar',
      doctype: 'Video',
      docname: docname,
    });
  };

  const onDeletePress = (_id, title) => {
    setWarning({
      show: true,
      _id: _id,
      title: 'Eliminar Video',
      description: `¿Estás seguro que deseas eliminar el video llamado: ${title}?`,
    });
  };

  const onCancelPress = () => {
    setWarning({
      show: false,
      _id: '',
      title: '',
      description: '',
    });
  };

  const onAcceptPress = (_id) => {
    const query = {model: 'Video'};
    const document = documents.find((doc) => doc._id === _id);
    const ids = [document._id];
    const names = [document.name];

    dispatch(deleteDocumentsRequest(query, {ids, names}));

    setWarning({
      show: false,
      _id: '',
      title: '',
      description: '',
    });
  };

  if (documentsStatus.loading) return <Spinner />;

  return (
    <Container>
      <FlatList
        data={documents}
        enableEmptySections={true}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{paddingBottom: 25}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item: {_id, name, title, description, link}}) => (
          <Video
            title={title}
            description={description}
            source={videos[link]}
            menu={
              authenticated && [
                {
                  icon: 'edit',
                  label: 'Modificar',
                  onPress: onEditPress.bind(null, name),
                },
                {
                  icon: 'trash',
                  label: 'Eliminar',
                  onPress: onDeletePress.bind(null, _id, title),
                },
              ]
            }
          />
        )}
      />
      {authenticated && (
        <FixedIcon name="plus" onPress={onPress} bottom="20px" right="20px" />
      )}
      {authenticated && (
        <Warning
          isVisible={warning.show}
          title={warning.title}
          description={warning.description}
          onCancel={onCancelPress}
          onAccept={onAcceptPress.bind(null, warning._id)}
        />
      )}
    </Container>
  );
};

export default Videos;
