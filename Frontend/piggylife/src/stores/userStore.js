import { observable, action } from "mobx";
import agent from "../agent";

export default class UserStore {
  @action
  register(user) {
    console.log(user);
  }
  @action
  login(user) {
    console.log(user);
  }
  @action
  email_check(email) {
    return agent.Data.email_check(email)
      .then((res) => {
        console.log(res);
        alert("사용가능한 이메일입니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("이미 등록된 이메일입니다.");
      });
  }
  @action
  code_check(user) {
    return agent.Data.code_check(user)
      .then((res) => {
        console.log(res);
        alert("인증되었습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("코드를 다시 확인해주세요!");
      });
  }
}
