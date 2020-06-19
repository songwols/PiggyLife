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
    window.sessionStorage.setItem("myfeed", color);
    this.myfeed = color;
  }
  @action
  setStatisticColor(color) {
    window.sessionStorage.setItem("statistic", color);
    this.statistic = color;
  }
  @action
  setHomeColor(color) {
    window.sessionStorage.setItem("home", color);
    this.home = color;
  }

  @action
  setFeedColor(color) {
    window.sessionStorage.setItem("feed", color);
    this.feed = color;
  }
  @action
  setPostColor(color) {
    window.sessionStorage.setItem("post", color);
    this.post = color;
  }
  @action
  setMapColor(color) {
    window.sessionStorage.setItem("map", color);
    this.map = color;
  }
  @action
  setMatchColor(color) {
    window.sessionStorage.setItem("match", color);
    this.match = color;
  }
  constructor(root) {
    this.root = root;
  }
}
