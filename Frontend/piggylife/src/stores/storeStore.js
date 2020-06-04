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
      .catch((err) => console.log(err));
  }
  @action
  get_mypost(uid) {
    return agent.Data.getMukitlist(uid)
      .then((res) => {
        this.setMyPosts(res.data);
      })
      .catch((err) => console.log(err));
  }
  @action
  get_top10() {
    return agent.Data.get_top10()
      .then((res) => {
        this.setTop10(res.data);
      })
      .catch((err) => console.log(err));
  }
  @action
  get_hotplace() {
    //  return agent.Data.get_hotplace()
    //    .then((res) => {
    //      this.setHotplace(res.data);
    //    })
    //    .catch((err) => console.log(err));
  }
  @action
  get_similar(uId) {
    return agent.Data.get_similar(uId)
      .then((res) => {
        this.setSimilar(res.data);
      })
      .catch((err) => console.log(err));
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
          alert("검색된 데이터가 없습니다.");
          window.location.reload();
        }
      })
      .catch((err) => alert("실패"));
  }

  @action mydetail(pid) {
    return agent.Data.mypdetail(pid)
      .then((res) => {
        this.mydetailPost = res.data;
        // console.log(res.data);
      })
      .catch((err) => alert("실패"));
  }

  @action upload(data, file) {
    const uid = window.sessionStorage.getItem("uid");
    return agent.Data.upload(data, uid)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 1) {
          if (file !== null) {
            this.postImage(file, res.data.data.pid);
          }
          window.location.replace("/feed");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  @action postImage(data, id) {
    console.log(id);
    return agent.Data.postImage(data, id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.replace("/feed");
        } else {
          console.log(res);
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
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

  @action detail(sid) {
    return agent.Data.detail(sid)
      .then((res) => {
        this.detailPost = res.data;
        // console.log(res.data);
      })
      .catch((err) => alert("실패"));
  }

  @action postupdate(data, file, pid) {
    console.log(data);
    console.log(pid);
    return agent.Data.postupdate(data, file, pid)
      .then((res) => {
        console.log(res.data);
        window.location.replace("/mydetail/" + pid);
      })
      .catch((err) => alert("실패"));
  }

  @action postdelete(pid) {
    return agent.Data.postdelete(pid)
      .then((res) => {
        window.location.replace("/feed");
      })
      .catch((err) => alert("실패"));
  }
}
