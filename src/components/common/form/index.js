import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {cloneDeep} from 'lodash';

import {
  selectDoctype,
  selectDoctypeFields,
} from '../../../store/doctypes/selectors';

import {
  selectFormDocument,
  selectFormLoading,
} from '../../../store/forms/selectors';

import {
  fetchFormDocumentRequest,
  deleteFormDocumentData,
} from '../../../store/forms/actions';

import {
  createDocumentsRequest,
  updateDocumentsRequest,
} from '../../../store/documents/actions';

import {selectDocumentsStatus} from '../../../store/documents/selectors';

import Input from '../input';
import Button from '../button';
import Notification from '../notification';

const Container = styled.View`
  width: 100%;
`;

const Heading = styled.Text`
  font-size: 30px;
  color: #444444;
  margin-bottom: 20px;
  text-align: center;
`;

const FlatList = styled.FlatList`
  padding: 25px;
`;

const Buttons = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 50px;
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 18px;
  letter-spacing: 1px;
  color: #ffffff;
`;

const Form = ({
  doctype,
  docname,
  title,
  caption,
  onSubmit,
  onSuccess,
  successNotification,
}) => {
  const dispatch = useDispatch();
  const doctypeData = useSelector(selectDoctype(doctype));
  const doctypeFields = useSelector(selectDoctypeFields(doctype));
  const documentData = useSelector(selectFormDocument(docname));
  const documentStatus = useSelector(selectDocumentsStatus);

  const [notification, setNotification] = useState({
    show: false,
    title: '',
    description: '',
  });

  const [state, setState] = useState({});
  const [isNew, setIsNew] = useState(true);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // Populate every Link and Table field
    const populate = doctypeFields
      .reduce((acc, val) => {
        if (val.field_type === 'Table') acc.push(val.field_name);

        return acc;
      }, [])
      .join(',');

    // Fetch document based on doctype and docname

    const query = {model: doctype, name: docname, populate};
    dispatch(fetchFormDocumentRequest(query));
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    const {loading, error} = documentStatus;

    // show spinner
    if (loading && !error) {
    }
    // hide spinner and error notification
    if (!loading && error) {
      showNotification(
        'Error de Conexión',
        'Hubo un error al momento de realizar la petición. Revisa tu conexión a internet.',
      );
    }
    // hide spinner and success notification
    if (!loading && !error) {
      if (successNotification) {
        showNotification(
          successNotification.title,
          successNotification.description,
        );
      }

      if (onSuccess) onSuccess();
      dispatch(deleteFormDocumentData({name: docname}));
    }
  }, [documentStatus]);

  // Reshape object and fill the form based on document data
  useEffect(() => {
    const stateObject = doctypeFields.reduce((acc, val) => {
      const {field_name, field_type, options} = val;

      acc[field_name] = {value: undefined, valid: true};

      if (documentData[field_name]) {
        acc[field_name].value = documentData[field_name];
      } else {
        if (field_type === 'Number') {
          acc[field_name].value = val.default ? Number(val.default) : 0;
        } else if (field_type === 'Check') {
          acc[field_name].value = val.default === 'true' ? true : false;
        } else if (field_type === 'Select') {
          acc[field_name].value = options.split('\n')[0];
        } else if (field_type === 'Table') {
          acc[field_name].value = [];
        } else if (field_type === 'Date' || field_type === 'Time') {
          acc[field_name].value = new Date();
        } else {
          acc[field_name].value = val.default;
        }
      }
      return acc;
    }, {});

    setIsNew(Object.keys(documentData).length === 0);
    setState(stateObject);
  }, [documentData]);

  const showNotification = (title, description) => {
    setNotification({
      show: true,
      title: title,
      description: description,
    });
  };

  const hideNotification = () => {
    setNotification({
      show: false,
      title: '',
      description: '',
    });
  };

  const onChange = (index, name, value, valid) => {
    const newState = {...state};

    newState[name].value = value;
    newState[name].valid = valid;

    setState(newState);
  };

  const submitDocument = () => {
    // Check validity of all fields here!
    let valid = true;

    for (const field in state) {
      if (!state[field].valid) {
        valid = false;
      }
    }

    if (!valid) return;

    // Clone state
    const newState = cloneDeep(state);

    // Transform state
    for (const field in newState) {
      const value = newState[field].value;

      if (Array.isArray(value)) {
        for (const index in value) {
          for (const subfield in value[index]) {
            value[index][subfield] = value[index][subfield].value;
          }
        }
      }

      newState[field] = value;
    }

    // Handle submit
    if (onSubmit) {
      onSubmit(newState);
      return;
    }

    // Prepare query
    const query = {model: doctype, name: docname};

    const [subfields, submodels] = doctypeFields.reduce(
      (acc, val) => {
        if (val.field_type === 'Table') {
          acc[0].push(val.field_name);
          acc[1].push(val.options);
        }
        return acc;
      },
      [[], []],
    );

    query.subfields = subfields.join(',');
    query.submodels = submodels.join(',');

    // Determine action type
    if (isNew) {
      dispatch(createDocumentsRequest(query, [newState]));
    }

    if (!isNew) {
      newState._id = documentData._id;
      newState.name = documentData.name;
      dispatch(updateDocumentsRequest(query, [newState]));
    }
  };

  return (
    <Container>
      {Object.keys(state).length > 0 && (
        <FlatList
          data={doctypeFields}
          enableEmptySections={true}
          keyExtractor={(item) => item.field_name}
          renderItem={({item: {hidden, ...field}}) =>
            !hidden && (
              <Input
                doc={state}
                onChange={onChange}
                parent_model={doctype}
                parent_name={docname}
                {...field}
              />
            )
          }
          ListHeaderComponent={<Heading>{title}</Heading>}
          ListFooterComponent={
            <Buttons>
              <Button onPress={submitDocument} bgColor="#2d1b58">
                <View>
                  <Text>{caption}</Text>
                </View>
              </Button>
            </Buttons>
          }
        />
      )}

      <Notification
        isVisible={notification.show}
        title={notification.title}
        description={notification.description}
        onCancel={hideNotification}
      />
    </Container>
  );
};

export default Form;
