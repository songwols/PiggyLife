import { observable, action } from "mobx";

export default class ColorStore {
  @observable home = "#5897A6";
  @observable feed = "#cccccc";
  @observable post = "#cccccc";
  @observable map = "#cccccc";
  @observable match = "#cccccc";
  @observable myfeed = "#5897A6";
  @observable statistic = "#cccccc";

  @action
  setMyFeedColor(color) {
    localStorage.setItem("myfeed", color);
    this.myfeed = color;
  }
  @action
  setStatisticColor(color) {
    localStorage.setItem("statistic", color);
    this.statistic = color;
  }
  @action
  setHomeColor(color) {
    localStorage.setItem("home", color);
    this.home = color;
  }

  @action
  setFeedColor(color) {
    localStorage.setItem("feed", color);
    this.feed = color;
  }
  @action
  setPostColor(color) {
    localStorage.setItem("post", color);
    this.post = color;
  }
  @action
  setMapColor(color) {
    localStorage.setItem("map", color);
    this.map = color;
  }
  @action
  setMatchColor(color) {
    localStorage.setItem("match", color);
    this.match = color;
  }
  constructor(root) {
    this.root = root;
  }
}
