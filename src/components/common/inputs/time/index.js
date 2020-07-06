import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const Container = styled.View`
  width: 100%;
  position: relative;
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
  padding: 10px 52px 10px 15px;
  margin-bottom: 10px;
  border: 2px solid ${(props) => (props.valid ? '#d1d8dd' : '#ff5858')};
  border-radius: 10px;
  ${(props) => (props.noBorder ? 'margin: 0;' : '')}
  ${(props) => (props.noBorder ? 'border: none;' : '')}
  color: #444444;
  font-size: 16px;
`;

const Icon = styled(IonIcon)`
  position: absolute;
  bottom: ${(props) => (props.noBorder ? '6px' : '18px')};
  right: 12px;
`;

const TimeInput = ({
  label,
  field_name,
  idx,
  doc,
  noBorder,
  onChange,
  required,
  ...props
}) => {
  const [state, setState] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (typeof doc[field_name].value === 'string') {
      doc[field_name].value = new Date(doc[field_name].value);
    }

    setValid(doc[field_name].valid);
    setState(doc[field_name].value);
  }, [doc[field_name].value]);

  const onLocalChange = (e, value = state) => {
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
    setShow(Platform.OS === 'ios');
    onChange(idx, field_name, value, valid);
  };

  const onPress = () => {
    setShow(true);
  };

  return (
    <Container>
      {label ? <Label valid={valid}>{label}</Label> : null}
      <Input
        underlineColorAndroid="transparent"
        valid={valid}
        value={moment(state).format('hh:mm A')}
        noBorder={noBorder}
        editable={false}
      />
      <Icon
        name="md-time"
        size={35}
        color="#888888"
        onPress={onPress}
        noBorder={noBorder}
      />
      {show && (
        <DateTimePicker
          value={state}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onLocalChange}
        />
      )}
    </Container>
  );
};

export default TimeInput;
