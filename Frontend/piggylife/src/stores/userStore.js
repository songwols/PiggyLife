import { observable, action, reaction } from "mobx";
import agent from "../agent";

export default class UserStore {
  @observable isCheck = false;
  @observable email = "";
  @observable nickname = "";
  @observable image = "";
  @observable data = "";

  @action
  findByEmail(email) {
    console.log(email);
    return agent.Data.findByEmail(email)
      .then((res) => {
        alert("매칭을 시작합니다!");
        window.location.replace("/Result");
      })
      .catch((err) => {
        alert("존재하지 않는 이메일입니다.");
      });
  }

  @action
  whoami(email) {
    return agent.Data.findByEmail(email)
      .then((res) => {
        this.email = res.data.email;
        this.image = res.data.image;
        this.nickname = res.data.nickname;
        this.ranking = res.data.ranking;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @action
  register(user) {
    return agent.Data.signup(user)
      .then((res) => {
        alert(user.nickname + " 님! 회원가입이 완료되었습니다.");
        window.location.replace("/");
      })
      .catch((err) => {
        alert("회원가입에 실패하였습니다.");
      });
  }
  @action
  login(user) {
    return agent.Data.signin(user)
      .then((res) => {
        window.sessionStorage.setItem("email", user.email);
        window.location.replace("/Home");
      })
      .catch((err) => {
        alert("이메일과 패스워드를 확인해주세요.");
        console.log(err);
      });
  }

  @action
  email_check(email) {
    return agent.Data.email_check(email)
      .then((res) => {
        return agent.Data.email_send(email)
          .then((res) => {
            alert("인증번호를 입력해주세요.");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert("중복된 이메일입니다.");
      });
  }
  @action
  code_check(user) {
    return agent.Data.code_check(user)
      .then((res) => {
        this.isCheck = true;
        alert("인증되었습니다.");
      })
      .catch((err) => {
        alert("인증번호를 확인해주세요.");
      });
  }
}
