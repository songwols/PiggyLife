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
  email_check: (email) =>
    requests.get(`/sign/checkDuplicateEmail?email=${email}`),
  code_check: (user) =>
    requests.get(`/sign/EmailConfirm?email=${user.email}&authkey=${user.code}`),
  signup: (user) =>
    requests.post(`/sign/signup`, {
      email: user.email,
      image: "",
      nickname: user.nickname,
      password: user.password,
    }),
  signin: (user) =>
    requests.post(`/sign/signin`, {
      email: user.email,
      password: user.password,
    }),
  email_send: (email) => requests.post(`/sign/emailSend?email=${email}`),
  findByEmail: (email) => requests.get(`/user/findByEmail?email=${email}`),
  signin: (user) =>
    requests.get(`/sign/signin?email=${user.email}&password=${user.password}`),
  findById: (token) => requests.get(`/user/findById?TOKEN=${token}`),
};

export default {
  Data,
};
