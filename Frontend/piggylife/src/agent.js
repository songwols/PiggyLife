import axios from "axios";

const API_ROOT = "http://52.78.169.231:8080/PIGGY";

const requests = {
  get: (url, header) => axios.get(`${API_ROOT}${url}`, { headers: header }),
  post: (url, body, header) =>
    axios.post(`${API_ROOT}${url}`, body, { headers: header }),
};

const Data = {
  get_myposts: () => requests.get(``), //url 정해지면 채워넣기
  get_top10: () => requests.get(`/store/getStoreTop10`),
  email_check: (email) => requests.get(`/sign/checkEmail?email=${email}`),
  code_check: (user) =>
    requests.get(`/sign/EmailConfirm?email=${user.email}&authkey=${user.code}`),
  search: (store_name) =>
    requests.get(`/store/findByName?name=${store_name}`),
  detail: (sid) =>
    requests.get(`/store/findById/${sid}`),
};

export default {
  Data,
};
