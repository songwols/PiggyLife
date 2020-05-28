import { observable, action } from "mobx";

export default class UserStore {
  @action
  register(user) {
    console.log(user);
  }
  @action
  login(user) {
    console.log(user);
  }
}
