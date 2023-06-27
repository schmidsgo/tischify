import axios from 'axios';

const setAuthHeader = async token => {
  if (token) {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers = {
      Authorization: 'Bearer ' + token
    };
  } else {
    delete axios.defaults.headers.Authorization;
  }
};

export default setAuthHeader;
