import { observable, action, computed } from "mobx";
import agent from "../agent";

export default class StoreStore {
  @observable posts = [];
  @observable myposts = [];
  @observable store_name = "";
  @observable storeItems = [];
  @observable mydetailPost = {};
  @observable top10 = [];
  @observable hotplace = [];
  @observable similar = [];
  @observable location = [];
  @observable detailPost = {};
  @observable for2 = [];
  @observable newplace = [];
  @observable similarity = "";
  @observable RFindAll = [];
  @observable RFindMy = [];

  @computed get postslength() {
    return this.posts.length;
  }
  @computed get mypostslength() {
    return this.myposts.length;
  }
  @computed get top10length() {
    return this.top10.length;
  }
  @computed get hotplacelength() {
    return this.hotplace.length;
  }
  @computed get similarlength() {
    return this.similar.length;
  }
  @computed get for2length() {
    return this.for2.length;
  }
  @computed get newplacelength() {
    return this.newplace.length;
  }

  @action
  get_post(uid) {
    return agent.Data.get_mypost(uid)
      .then((res) => {
        this.setPosts(res.data);
        this.location = [];
        for (var i = 0; i < res.data.length; i++) {
          this.location = this.location.concat({
            lat: res.data[i].store.latitude,
            long: res.data[i].store.longitude,
            name: res.data[i].store.name,
            address: res.data[i].store.address,
            vis: res.data[i].visited,
            pid: res.data[i].pid,
          });
        }
      })
      .catch((err) => alert("실패하였습니다"));
  }
  @action
  get_mypost(uid) {
    return agent.Data.getMukitlist(uid)
      .then((res) => {
        this.setMyPosts(res.data);
      })
      .catch((err) => alert("실패하였습니다"));
  }
  @action
  get_top10() {
    return agent.Data.get_top10()
      .then((res) => {
        this.setTop10(res.data);
      })
      .catch((err) => alert("실패하였습니다"));
  }
  @action
  get_hotplace(uid) {
     return agent.Data.get_hotplace(uid)
       .then((res) => {
         this.setHotplace(res.data.recommendStores);
       })
       .catch((err) => console.log(err));
  }
  @action
  get_similar(uId) {
    return agent.Data.get_similar(uId)
      .then((res) => {
        this.setSimilar(res.data);
      })
      .catch((err) => alert("실패하였습니다"));
  }
  @action
  get_for2(mid, fid) {
    return agent.Data.get_for2(mid, fid)
      .then((res) => {
        this.setFor2(res.data.recommendStores);
        this.setNewPlace(res.data.newStores);
        this.similarity = res.data.similarity;
      })
      .catch((err) => alert("실패하였습니다"));
  }
  @action
  get_newplace() {
    // return agent.Data.get_newplace()
    //   .then((res) => {
    //     this.newplace=res.data;
    //   })
    //   .catch((err) => alert("실패하였습니다"););
  }

  @action
  setMyPosts(myposts) {
    this.myposts = myposts;
  }
  @action
  setPosts(posts) {
    this.posts = posts;
  }
  @action search(store_name) {
    this.store_name = store_name;
    return agent.Data.search(this.store_name)
      .then((res) => {
        this.storeItems = res.data;
        if (res.data.length === 0) {
          if(window.confirm("검색된 데이터가 없습니다. 데이터 추가를 하러 가시겠습니까?")){
            window.location.replace("/more")
          }else{
            window.location.replace("/write")
          }
        }
      })
      .catch((err) => alert("실패"));
  }

  @action mydetail(pid) {
    return agent.Data.mypdetail(pid)
      .then((res) => {
        this.mydetailPost = res.data;
      })
      .catch((err) => alert("실패"));
  }

  @action upload(data, file) {
    const uid = window.sessionStorage.getItem("uid");
    return agent.Data.upload(data, uid)
      .then((res) => {
        if (res.data.code === 1) {
          if (file !== null) {
            this.postImage(file, res.data.data.pid);
          }
          window.location.replace("/feed");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => alert("게시글 업로드에 실패하였습니다"));
  }

  @action postImage(data, id) {
    return agent.Data.postImage(data, id)
      .then((res) => {
        if (res.status === 200) {
          this.get_post(sessionStorage.getItem("uid"));
          window.location.replace("/feed");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => alert("파일 업로드에 실패하였습니다"));
  }

  @action
  setTop10(top10) {
    this.top10 = top10;
  }
  @action
  setHotplace(hotplace) {
    this.hotplace = hotplace;
  }
  @action
  setSimilar(similar) {
    this.similar = similar;
  }
  @action
  setFor2(for2) {
    this.for2 = for2;
  }
  @action
  setNewPlace(newplace) {
    this.newplace = newplace;
  }

  @action detail(sid) {
    return agent.Data.detail(sid)
      .then((res) => {
        this.detailPost = res.data;
      })
      .catch((err) => alert("실패"));
  }

  @action postupdate(data, file, pid) {
    var pars = encodeURIComponent(data.v_memo);
    return agent.Data.postupdate(data, file, pid, pars)
      .then((res) => {
        window.location.replace("/mydetail/" + pid);
      })
      .catch((err) => alert("실패"));
  }

  @action postdelete(pid) {
    return agent.Data.postdelete(pid, sessionStorage.getItem("uid"))
      .then((res) => {
        window.location.replace("/feed");
      })
      .catch((err) => alert("실패"));
  }

  @action requestStore(data){
    return agent.Data.requestStore(data, sessionStorage.getItem("uid"))
    .then((res) => {
      alert("성공적으로 요청되었습니다.")
    })
    .catch((err) => alert("실패"));
  }

  @action requestFindAll(){
    return agent.Data.requestFindAll()
    .then((res) => {
      this.setRequests(res.data);
    })
    .catch((err) => alert("실패"));
  }

  @action
  setRequests(data) {
    this.RFindAll = data;
  }

  @action Requestdelete(urid){
    return agent.Data.Requestdelete(urid)
    .then((res) => {
      alert("삭제가 완료되었습니다.")
      window.location.replace("/adminS");
    })
    .catch((err) => alert("실패"));
  }

  @action requestFindMy(uid){
    return agent.Data.requestFindMy(uid)
    .then((res) => {
      this.RFindMy=res.data;
    })
    .catch((err) => alert("실패"));
  }
}
