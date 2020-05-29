import React from "react";
import styled from "styled-components";
import Confirm from "./confirm";
import { Link } from "react-router-dom";
import Check from "./check";
import { inject, observer } from "mobx-react";

@inject("userStore")
@observer
class CJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false,
      showCheck: false,
      email: "",
      emailcheck: "",
      nickname: "",
      password: "",
      password2: "",
    };
  }

  toggleCheck() {
    this.setState({
      showCheck: !this.state.showCheck,
    });
  }
  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onEmailCheckChange = (e) => {
    this.setState({
      emailcheck: e.target.value,
    });
  };
  onNicknameChange = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  };
  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  onPassword2Change = (e) => {
    this.setState({
      password2: e.target.value,
    });
  };
  Register = (e) => {
    if (this.state.password === this.state.password2) {
      if (this.props.userStore.isCheck) {
        const user = {
          email: this.state.email,
          nickname: this.state.nickname,
          password: this.state.password,
          password2: this.state.password2,
        };
        this.props.userStore.register(user);
        alert(this.state.username + "님! 회원가입이 완료되었습니다!");
      } else {
        alert("이메일 인증을 확인해주세요!");
      }
    } else {
      alert("비밀번호를 확인해주세요!");
    }
  };

  EmailCheck = (e) => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });

    this.props.userStore.email_check(this.state.email);
  };

  render() {
    return (
      <Frame>
        EMAIL
        <Input
          placeholder="이메일을 입력해주세요"
          onChange={this.onEmailChange}
          name="email"
          value={this.state.email}
        ></Input>
        <EBF>
          <EButton onClick={this.EmailCheck}>이메일 인증</EButton>
        </EBF>
        {this.state.showConfirm ? (
          <Confirm
            onChange={this.onEmailCheckChangeChange}
            name="emailcheck"
            value={this.state.emailcheck}
            email={this.state.email}
          />
        ) : null}
        <Space></Space>
        닉네임
        <Input
          placeholder="닉네임"
          onChange={this.onNicknameChange}
          name="nickname"
          value={this.state.nickname}
        ></Input>
        <Space></Space>
        PASSWORD
        <Input
          placeholder="비밀번호"
          type="password"
          onChange={this.onPasswordChange}
          name="password"
          value={this.state.password}
        ></Input>
        <Input
          placeholder="비밀번호 확인"
          type="password"
          onChange={this.onPassword2Change}
          name="password2"
          value={this.state.password2}
        ></Input>
        <Space></Space>
        <EBF>
          <CButton onClick={this.Register}>회원가입</CButton>
        </EBF>
        {this.state.showCheck ? (
          <Check cancelCheck={this.toggleCheck.bind(this)} />
        ) : null}
      </Frame>
    );
  }
}

const Space = styled.div`
  height: 2rem;
`;

const Frame = styled.div`
  grid-area: "content";
  padding: 10%;
  width: 100wh;
`;
const Input = styled.input`
  font-size: 1rem;
  margin-top: 0.3rem;
  width: 95%;
  padding-left: 0.3rem;
  background: none;
  border-color: gray;
  border-style: solid;
  border-radius: 0.3rem;
  outline: none;
  box-shadow: none;
  border-width: 0.05rem;
  height: 2rem;
`;

const EBF = styled.div`
  text-align: center;
  width: 95%;
`;

const EButton = styled.button`
  margin-top: 0.3rem;
  width: 40%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #5897a6;
`;

const CButton = styled.button`
  margin-top: 0.3rem;
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #5897a6;
`;

export default CJoin;
