import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-community/picker';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  width: 100%;
  color: ${(props) => (props.valid ? '#888888' : '#ff5858')};
  margin-bottom: 10px;
  margin-left: 2px;
  text-align: left;
  letter-spacing: 1px;
`;

const Input = styled.View`
  width: 100%;
  padding: 0 5px;
  margin-bottom: 10px;
  border: 2px solid ${(props) => (props.valid ? '#d1d8dd' : '#ff5858')};
  border-radius: 10px;
  color: #444444;
  font-size: 18px;
  letter-spacing: 1px;
`;

const SelectInput = ({
  label,
  field_name,
  idx,
  doc,
  onChange,
  required,
  ...props
}) => {
  const [options] = useState(props.options.split('\n'));
  const [state, setState] = useState(options[0]);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setState(doc[field_name].value);
    setValid(doc[field_name].valid);
  }, [doc[field_name].value]);

  const onLocalChange = (value) => {
    let valid = false;
    if (required) {
      if (value) {
        valid = true;
      } else {
        valid = false;
      }
    } else {
      valid = true;
    }

    setValid(valid);
    setState(value);
    onChange(idx, field_name, value, valid);
  };

  return (
    <Container>
      {label ? <Label valid={valid}>{label}</Label> : null}
      <Input valid={valid}>
        <Picker selectedValue={state} onValueChange={onLocalChange}>
          {options.map((option) => (
            <Picker.Item label={option} value={option} color="#444444" />
          ))}
        </Picker>
      </Input>
    </Container>
  );
};

export default SelectInput;
