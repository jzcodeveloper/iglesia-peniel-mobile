import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';

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

const CheckInput = ({
  label,
  field_name,
  idx,
  doc,
  noBorder,
  onChange,
  required,
  ...props
}) => {
  const [state, setState] = useState(false);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setValid(doc[field_name].valid);
    setState(doc[field_name].value);
  }, [doc[field_name].value]);

  const onLocalChange = (value) => {
    onChange(idx, field_name, value, valid);
  };

  return (
    <Container>
      {label ? <Label valid={valid}>{label}</Label> : null}
      <CheckBox
        disabled={false}
        value={state}
        onValueChange={onLocalChange}
        tintColors={{true: '#2d1b58', false: '#444444'}}
        onFillColor="#2d1b58"
      />
    </Container>
  );
};

export default CheckInput;
