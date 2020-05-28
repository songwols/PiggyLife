import axios from "axios";

const API_ROOT = "http://localhost:8000";

const requests = {
  get: (url, header) => axios.get(`${API_ROOT}${url}`, { headers: header }),
  post: (url, body, header) =>
    axios.post(`${API_ROOT}${url}`, body, { headers: header }),
};

const Data = {
  get_myposts: () => requests.get(``), //url 정해지면 채워넣기
};

export default {
  Data,
};
