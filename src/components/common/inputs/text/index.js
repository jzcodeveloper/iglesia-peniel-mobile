import React, {useState, useEffect} from 'react';
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

const Input = styled.TextInput`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: 2px solid ${(props) => (props.valid ? '#d1d8dd' : '#ff5858')};
  border-radius: 10px;
  ${(props) => (props.noBorder ? 'margin: 0;' : '')}
  ${(props) => (props.noBorder ? 'border: none;' : '')}
  color: #444444;
  font-size: 16px;
`;

const TextInput = ({
  label,
  field_name,
  idx,
  doc,
  noBorder,
  onChange,
  required,
  ...props
}) => {
  const [state, setState] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(doc[field_name].valid);
    setState(doc[field_name].value);
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
  };

  const onEndEditing = () => {
    onChange(idx, field_name, state, valid);
  };

  return (
    <Container>
      {label ? <Label valid={valid}>{label}</Label> : null}
      <Input
        underlineColorAndroid="transparent"
        valid={valid}
        value={state}
        onChangeText={onLocalChange}
        onEndEditing={onEndEditing}
        noBorder={noBorder}
        {...props}
      />
    </Container>
  );
};

export default TextInput;
