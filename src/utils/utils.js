import axios from '../store/axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = '';
  }
};

export const formatDate = (date, format) => {
  const d = new Date(date);

  let month = '' + (d.getUTCMonth() + 1);
  let day = '' + d.getUTCDate();
  let year = d.getUTCFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  format = format.replace('yyyy', year);
  format = format.replace('mm', month);
  format = format.replace('dd', day);

  return format;
};
