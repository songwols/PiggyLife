import { observable, action, reaction } from "mobx";
import agent from "../agent";

export default class UserStore {
  @observable isCheck = false;
  @observable email = "";
  @observable nickname = "";
  @observable image = "";
  @observable data = "";
  @observable ranking = 0;

  @action
  updatepw(user) {
    return agent.Data.updatepw(user)
      .then((res) => {
        alert("패스워드가 변경되었습니다.");
        window.location.replace("/");
      })
      .catch((err) => {
        alert("실패하였습니다");
      });
  }

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
  logout() {
    window.sessionStorage.removeItem("email");
    window.sessionStorage.removeItem("uid");
    window.sessionStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    window.location.replace("/");
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
        console.log(res);
        if (res.data.code === 1) {
          window.sessionStorage.setItem("email", user.email);
          window.sessionStorage.setItem("uid", res.data.uId);
          window.sessionStorage.setItem("token", res.data.token);
          window.location.replace("/Home");
        } else {
          alert(res.data.massage);
        }
      })
      .catch((err) => {
        alert("이메일과 패스워드를 확인해주세요.");
        console.log(err);
      });
  }

  @action
  email_check(email, where) {
    return agent.Data.email_check(email)
      .then((res) => {
        console.log(res);
        if (res.data.success === true || where === "pw") {
          return agent.Data.email_send(email)
            .then((res) => {
              alert(res.data.message);
            })
            .catch((err) => {
              alert("중복된 이메일입니다.");
            });
        } else {
          if (where === "register") {
            alert("중복된 이메일입니다.");
          }
        }
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
        alert(res.data.message);
      })
      .catch((err) => {
        alert("인증번호를 확인해주세요.");
      });
  }
}
