import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postNewKeyboard = (newKeyboard) => {
  const request = axios.post(baseUrl, newKeyboard);
  return request.then((response) => response.data);
};

const deleteKeyboard = (id) => {
  const deleteRequest = axios.delete(`${baseUrl}/${id}`);

  return deleteRequest.then((response) => response.data);
};

const exportedObject = {
  getAll,
  postNewKeyboard,
  deleteKeyboard,
};

export default exportedObject;
