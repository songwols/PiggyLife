import axios from "axios";

const API_ROOT = "http://52.78.169.231:8080/PIGGY";

const requests = {
  get: (url, header) => axios.get(`${API_ROOT}${url}`, { headers: header }),
  post: (url, body, header) =>
    axios.post(`${API_ROOT}${url}`, body, { headers: header }),
};

const Data = {
  get_mypost: (uid) => requests.get(`/post/findByUser/${uid}`), //url 정해지면 채워넣기
  getMukitlist: (uid) => requests.get(`/post/getMukitlist/${uid}`),
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
    requests.get(`/sign/signin?email=${user.email}&password=${user.password}`),
  email_send: (email) => requests.post(`/sign/emailSend?email=${email}`),
  search: (store_name) =>
    requests.get(`/store/findByName?name=${store_name}`),
  mypdetail: (pid) =>
    requests.get(`/post/findById/${pid}`),
  detail: (sid) => requests.get(`/store/findById/${sid}`),
  upload: (info, uid) =>
    requests.post(`/post/create/${uid}`, {
      content: info.v_memo,
      image: "",
      isLike: info.isLike,
      sid: info.sid,
      visited: info.visited,
    }),
  findByEmail: (email) => requests.get(`/user/findByEmail?email=${email}`),
  signin: (user) =>
    requests.get(`/sign/signin?email=${user.email}&password=${user.password}`),
  findById: (token) => requests.get(`/user/findById?TOKEN=${token}`),
  detail: (sid) =>
    requests.get(`/store/findById/${sid}`),
};

export default {
  Data,
};
