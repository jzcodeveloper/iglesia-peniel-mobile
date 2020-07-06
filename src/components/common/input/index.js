import React from 'react';
import styled from 'styled-components';

import TextInput from '../inputs/text';
import DateInput from '../inputs/date';
import TimeInput from '../inputs/time';
import PasswordInput from '../inputs/password';
import TextAreaInput from '../inputs/textarea';
import SelectInput from '../inputs/select';
import TableInput from '../inputs/table';
import CheckInput from '../inputs/check';

const Input = ({field_type, ...props}) => {
  return field_type === 'Data' ? (
    <TextInput {...props} />
  ) : field_type === 'Date' ? (
    <DateInput {...props} />
  ) : field_type === 'Time' ? (
    <TimeInput {...props} />
  ) : field_type === 'Select' ? (
    <SelectInput {...props} />
  ) : field_type === 'Small Text' ? (
    <TextAreaInput {...props} />
  ) : field_type === 'Password' ? (
    <PasswordInput {...props} />
  ) : field_type === 'Table' ? (
    <TableInput {...props} />
  ) : field_type === 'Check' ? (
    <CheckInput {...props} />
  ) : null;
};

/* : field_type === "Number" ? (
        <NumberInput {...props} />
      )  : field_type === "Link" ? (
        <LinkInput {...props} />
      ) : field_type === "Table Link" ? (
        <TableLinkInput {...props} />
      )  */

export default Input;
