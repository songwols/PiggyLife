import axios from "axios";

const API_ROOT = "http://52.78.169.231:8080/PIGGY";

const requests = {
  get: (url, header) => axios.get(`${API_ROOT}${url}`, { headers: header }),
  post: (url, body, header) =>
    axios.post(`${API_ROOT}${url}`, body, { headers: header }),
  put: (url, body, header) =>
    axios.put(`${API_ROOT}${url}`, body, { headers: header }),
  delete: (url, header) =>
    axios.delete(`${API_ROOT}${url}`, { headers: header }),
};

const Data = {
  get_mypost: (uid) => requests.get(`/post/findByUser/${uid}`), //url 정해지면 채워넣기
  getMukitlist: (uid) => requests.get(`/post/getMukitlist/${uid}`),
  get_top10: () => requests.get(`/store/getStoreTop10`),
  get_similar: (uId) => requests.get(`/recommend/findUserRecommend?uId=${uId}`),
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
  email_send: (email) => requests.post(`/sign/emailSend?email=${email}`),
  search: (store_name) => requests.get(`/store/findByName?name=${store_name}`),
  mypdetail: (pid) => requests.get(`/post/findById/${pid}`),
  detail: (sid) => requests.get(`/store/findById/${sid}`),
  upload: (info, uid) =>
    requests.post(`/post/create/${uid}`, {
      content: info.v_memo,
      isLike: info.isLike,
      sid: info.sid,
      visited: info.visited,
    }),
  postImage: (info, id) => requests.post(`/post/postImage/${id}`, info, {}),
  findByEmail: (email) => requests.get(`/user/findByEmail?email=${email}`),
  signin: (user) =>
    requests.post(`/sign/signin`, {
      email: user.email,
      password: user.password,
    }),
  findById: (token) => requests.get(`/user/findUser`),
  updatepw: (user) =>
    requests.put(`/user/updatePassword`, {
      email: user.email,
      password: user.password,
    }),
  updateUser: (user, uid) =>
    requests.put(`/user/update/${uid}`, {
      email: user.email,
      image: user.image,
      nickname: user.nickname,
      password: user.password,
    }),
  checkPwd: (user, token) =>
    requests.post(
      `/user/checkPassword`,
      { email: user.email, password: user.currPwd },
      { TOKEN: token }
    ),

  postupdate: (data, file, pid, memo) =>
    requests.put(
      `/post/update/${pid}?content=${memo}&isLike=${data.isLike}&visited=${data.visited}`,
      file,
      {}
    ),
  getAreaStatistic: (uId) => requests.get(`/post/getAreaStatistic/${uId}`),
  getCategoryStatistic: (uId) =>
    requests.get(`/post/getCategoryStatistic/${uId}`),
  getCategoryStatisticByEmail: (email) =>
    requests.get(`/post/getCategoryStatisticByEmail?email=${email}`),
  postdelete: (pid,uid) => requests.delete(`/post/delete/${pid}?uId=${uid}`),
  profileImage: (file, uid) =>
    requests.post(`/user/uploadImage/${uid}`, file, {}),
  get_for2: (mid, fid) =>
    requests.get(`/recommend/findMatch?selfEmail=${mid}&friendEmail=${fid}`),
  get_hotplace: (uId) =>
    requests.get(`/recommend/findAreaRecommend?uId=${uId}`),
  deleteUser: (token) => requests.delete(`/user/deleteUser`, { TOKEN: token }),
  requestStore: (data,uid) => requests.post(`/Request/create/${uid}/?name=${data.store_name}&address=${data.address}`),
  requestFindAll: () => requests.get(`/Request/findAll`),
  Requestdelete: (urid) => requests.delete(`/Request/delete/${urid}`),
  requestFindMy: (uid) => requests.get(`/Request/findByUser/${uid}`),
  createStore: (data, menu) => requests.post(`/store/create`,{
    address: data.v_address,
    branch: data.v_branch,
    category: data.v_category,
    categoryGroup: data.v_categoryGroup,
    image: "",
    latitude: data.latitude,
    longitude: data.longitude,
    menues: menu,
    name: data.v_name,
    rid: data.rid,
    tel: data.v_tel,
  }),
};

export default {
  Data,
};
