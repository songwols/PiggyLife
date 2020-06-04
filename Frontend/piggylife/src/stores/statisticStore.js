import { observable, action } from "mobx";
import agent from "../agent";

export default class StatisticStore {
  @observable areaList = {};
  @observable bestarea = {
    area: "",
    city: "",
    cnt: "",
  };

  @observable categoryList = [];

  @action
  getAreaStatistic(uId) {
    return agent.Data.getAreaStatistic(uId)
      .then((res) => {
        //console.log(res);
        this.areaList = res.data;
        this.bestarea = res.data[0];
      })
      .catch((err) => console.log(err));
  }

  @action
  getCategoryStatistic(uId) {
    return agent.Data.getCategoryStatistic(uId)
      .then((res) => {
        this.categoryList = res.data;
      })
      .catch((err) => console.log(err));
  }

  constructor(root) {
    this.root = root;
  }
}
