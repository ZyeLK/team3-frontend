import axios from './api';

const registerUser = async (body) => {
  const response = await axios.post('/user/', body);
  return response;
};

const checkUserProperty = async (params) => {
  const response = await axios.get('/user/check/', {
    params,
  });
  return response;
};

const loginUser = async (body) => {
  const response = await axios.put('/user/login/', body);
  return response;
};
const logoutUser = async (token) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  const response = await axios.post('/user/logout/', {}, config);
  return response;
};

const sendEmail = async (token) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  const response = await axios.post('/user/verify/', {}, config);
  return response;
};

const deleteUser = async (token) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  return await axios.delete('/user/me/', config);
};

const updateUser = async (body, token) => {
  const config = { headers: { Authorization: `Token ${token}` } };
  return await axios.put('/user/me/', body, config);
};

export {
  registerUser,
  checkUserProperty,
  loginUser,
  logoutUser,
  sendEmail,
  deleteUser,
  updateUser,
};
