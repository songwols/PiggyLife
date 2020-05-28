import { observable, action, computed } from "mobx";
import agent from "../agent";

export default class StoreStore {
  @observable myposts = [];

  @computed get mypostslength() {
    return this.myposts.length;
  }

  @action
  get_mypost() {
    console.log("내가 작성한 먹킷리스트 불러오기");
    // return agent.Data.get_mypost()
    //   .then((res) => {
    //     this.setMyPosts(res.data.results);
    //   })

    //   .catch((err) => alert("검색 결과가 없습니다."));
  }
  @action
  setMyPosts(myposts) {
    this.myposts = myposts;
  }
}
