import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  fetchTableDocumentsRequest,
  deleteTableDocumentData,
} from '../../../../store/tables/actions';

import {selectTableDocument} from '../../../../store/tables/selectors';

import {
  selectDoctype,
  selectDoctypeFields,
  selectDoctypeListFields,
} from '../../../../store/doctypes/selectors';

import Button from '../../button';
import Input from '../../input';

const Container = styled.View`
  width: 100%;
`;

const FlatList = styled.FlatList``;

const Label = styled.Text`
  width: 100%;
  color: ${(props) => (props.valid ? '#888888' : '#ff5858')};
  margin-bottom: 10px;
  margin-left: 2px;
  text-align: left;
  letter-spacing: 1px;
`;

const Table = styled.View`
  width: 100%;
`;

const TableColumn = styled.View`
  width: 100%;
  align-items: flex-end;
  padding-right: 45px;
  margin-bottom: 10px;
  border: 2px solid ${(props) => (props.valid ? '#d1d8dd' : '#ff5858')};
  border-radius: 10px;
  color: #444444;
  font-size: 18px;
  letter-spacing: 1px;
`;

const AddIcon = styled(Icon)``;

const RemoveIcon = styled(Icon)`
  position: absolute;
  right: 10px;
  top: 4px;
  z-index: 1;
`;

const TableInput = ({
  doc,
  field_name,
  idx,
  label,
  onChange,
  options,
  parent_model,
  parent_name,
  required,
}) => {
  const dispatch = useDispatch();
  const doctypeFields = useSelector(selectDoctypeFields(options));
  const doctypeListFields = useSelector(selectDoctypeListFields(options));
  const documentData = useSelector(
    selectTableDocument({model: options, parent_model, parent_name}),
  );

  const [state, setState] = useState(documentData);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const query = {model: options, parent_model, parent_name};
    dispatch(fetchTableDocumentsRequest(query));
  }, []);

  useEffect(() => {
    const newState = documentData.reduce((acc, val) => {
      doctypeListFields.forEach(({field_name, field_type}) => {
        val[field_name] = {valid: true, value: val[field_name]};
      });
      acc.push(val);
      return acc;
    }, []);
    setState(newState);
  }, [documentData]);

  useEffect(() => {
    // Check validity of all fields here!
    let valid = true;
    state.forEach((doc) => {
      doctypeListFields.forEach(({field_name, field_type}) => {
        if (!doc[field_name].valid) {
          valid = false;
        }
      });
    });
    if (required && state.length === 0) valid = false;

    setValid(valid);
    onChange(idx, field_name, state, valid);
  }, [state]);

  const onLocalChange = (index, name, value, valid) => {
    const newState = [...state];

    // Works for date, password, text, textarea and link inputs
    newState[index][name].value = value;
    newState[index][name].valid = valid;
    // Still need to handle check, select inputs

    setState(newState);
  };

  const addRow = () => {
    // Reshape object and add new row based on doctype fields structure
    const stateObject = doctypeFields.reduce((acc, val) => {
      const {field_name, field_type, options} = val;

      acc[field_name] = {value: undefined, valid: true};

      if (field_type === 'Number') {
        acc[field_name].value = val.default ? Number(val.default) : 0;
      } else if (field_type === 'Check') {
        acc[field_name].value = val.default === 'true' ? true : false;
      } else if (field_type === 'Select') {
        acc[field_name].value = options.split('\n')[0];
      } else if (field_type === 'Date' || field_type === 'Time') {
        acc[field_name].value = new Date();
      } else {
        acc[field_name].value = val.default;
      }

      return acc;
    }, {});

    setState((prev) => prev.concat([stateObject]));
  };

  const deleteRow = (index) => {
    const newState = [...state];
    newState.splice(index, 1);
    setState(newState);
  };

  return (
    <Container>
      <Label valid={valid}>{label}</Label>
      <Table>
        {/* {state.length > 0 &&
          state.map((data, index) => (
            <TableColumn key={index} valid={valid}>
              <RemoveIcon
                name="times-circle"
                size={40}
                color="#2d1b58"
                onPress={deleteRow}
              />
              {doctypeListFields.map(({label, ...field}) => (
                <Input
                  key={field.field_name}
                  doc={state[index]}
                  idx={index}
                  onChange={onLocalChange}
                  label=""
                  placeholder={label}
                  noBorder
                  {...field}
                />
              ))}
            </TableColumn>
          ))} */}
        <FlatList
          data={state}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TableColumn valid={valid}>
              <RemoveIcon
                name="times-circle"
                size={40}
                color="#2d1b58"
                onPress={deleteRow}
              />
              {doctypeListFields.map(({label, ...field}) => (
                <Input
                  key={field.field_name}
                  doc={state[index]}
                  idx={index}
                  onChange={onLocalChange}
                  label=""
                  placeholder={label}
                  noBorder
                  {...field}
                />
              ))}
              {/* <FlatList
                data={doctypeListFields}
                enableEmptySections={true}
                keyExtractor={(item) => item.field_name}
                renderItem={({item: {label, ...field}}) => (
                  <Input
                    doc={state[index]}
                    idx={index}
                    onChange={onLocalChange}
                    label=""
                    placeholder={label}
                    noBorder
                    {...field}
                  />
                )}
              /> */}
            </TableColumn>
          )}
        />
      </Table>
      <AddIcon name="plus-circle" size={40} color="#2d1b58" onPress={addRow} />
    </Container>
  );
};

export default TableInput;
