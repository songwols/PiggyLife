import { observable, action } from "mobx";
import agent from "../agent";

export default class UserStore {
  @observable isCheck = false;

  @action
  register(user) {
    return agent.Data.signup(user)
      .then((res) => {
        alert(res.data);
        window.location.replace("/");
      })
      .catch((err) => {
        alert(err.data);
      });
  }
  @action
  login(user) {
    console.log(user);
  }
  @action
  email_check(email) {
    return agent.Data.email_check(email)
      .then((res) => {
        alert(res.data);
        return agent.Data.email_send(email)
          .then((res) => {
            alert(res.data);
          })
          .catch((err) => {
            alert(err.data);
          });
      })
      .catch((err) => {
        alert(err.data);
      });
  }
  @action
  code_check(user) {
    return agent.Data.code_check(user)
      .then((res) => {
        this.isCheck = true;
        alert(res.data);
      })
      .catch((err) => {
        alert(err.data);
      });
  }
}
