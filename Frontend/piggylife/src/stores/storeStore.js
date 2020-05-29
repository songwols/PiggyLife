import { observable, action, computed } from "mobx";
import agent from "../agent";

export default class StoreStore {
  @observable myposts = [];
  @observable top10 = [];
  @observable hotplace = [];
  @observable similar = [];

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
  get_mypost() {
    //console.log("내가 작성한 먹킷리스트 불러오기");
    // return agent.Data.get_mypost()
    //   .then((res) => {
    //     this.setMyPosts(res.data.results);
    //   })
    //   .catch((err) => console.log(err));
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
  get_similar() {
    //  return agent.Data.get_similar()
    //    .then((res) => {
    //      this.setSimilar(res.data);
    //    })
    //    .catch((err) => console.log(err));
  }
  @action
  setMyPosts(myposts) {
    this.myposts = myposts;
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
}
