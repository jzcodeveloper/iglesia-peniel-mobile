import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';

import advice from '../../data/advice';

import {
  createDocumentsRequest,
  fetchDocumentsRequest,
  deleteDocumentsRequest,
} from '../../store/documents/actions';
import {selectDoctypeFields} from '../../store/doctypes/selectors';
import {
  selectDocuments,
  selectDocumentsStatus,
} from '../../store/documents/selectors';
import {selectAuthenticated} from '../../store/user/selectors';

import Article from '../../components/article';
import Grid from '../../components/common/grid';
import Form from '../../components/common/form';
import Warning from '../../components/common/warning';
import Notification from '../../components/common/notification';
import Spinner from '../../components/common/spinner';

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView``;

const FlatList = styled.FlatList`
  padding: 25px;
`;

const Advices = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const doctypeFields = useSelector(selectDoctypeFields('Advice'));
  const documents = useSelector(selectDocuments({model: 'Advice'}));
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
    if (authenticated && documents.length === 0) {
      const query = {model: 'Advice', limit: 1000};
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
    const query = {model: 'Advice', limit: 1000};
    dispatch(fetchDocumentsRequest(query));
  };

  const onDeletePress = (_id, description) => {
    setWarning({
      show: true,
      _id: _id,
      title: 'Eliminar Inquietud',
      description: `¿Estás seguro que deseas eliminar la siguiente inquietud: "${description}"?`,
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
    const query = {model: 'Advice'};
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

  if (authenticated && documentsStatus.loading) return <Spinner />;

  return (
    <Container>
      {authenticated && (
        <FlatList
          data={documents}
          enableEmptySections={true}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{paddingBottom: 25}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item: {_id, description, phone}}) => (
            <Grid
              description={description}
              bottomLeft={phone}
              source={require('../../assets/images/grids/05.jpg')}
              menu={[
                {
                  icon: 'trash',
                  label: 'Eliminar',
                  onPress: onDeletePress.bind(null, _id, description),
                },
              ]}
            />
          )}
        />
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

      {!authenticated && (
        <ScrollView>
          <Article
            image={advice.image}
            title={advice.title}
            content={advice.content}
            author={advice.author}
          />
          <Form
            title="Cuéntanos Tu Inquietud"
            caption="Enviar"
            doctype="Advice"
            docname="New Advice"
            successNotification={{
              title: '¡Petición enviada!',
              description: 'Tu petición ha sido enviada exitosamente.',
            }}
          />
        </ScrollView>
      )}
    </Container>
  );
};

export default Advices;
