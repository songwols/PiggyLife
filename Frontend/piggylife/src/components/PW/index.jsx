import React from "react";
import styled from "styled-components";
import Confirm from "../Join/confirm";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("userStore")
@observer
class PW extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailcheck: "",
      showConfirm: false,
      password: "",
      password2: "",
    };
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
  toggleConfirm() {
    this.props.userStore.email_check(this.state.email);
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  }
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

  UpdatePW = (e) => {
    if (this.state.password === this.state.password2) {
      if (this.props.userStore.isCheck) {
        const password = this.state.password;
        this.props.userStore.updatepw(password);
      } else {
        alert("이메일 인증을 확인해주세요!");
      }
    } else {
      alert("비밀번호를 확인해주세요!");
    }
  };

  render() {
    return (
      <Frame>
        <Space></Space>
        EMAIL
        <Input
          placeholder="이메일을 입력해주세요"
          onChange={this.onEmailChange}
          name="email"
          value={this.state.email}
        ></Input>
        <EBF>
          <EButton onClick={this.toggleConfirm.bind(this)}>이메일 인증</EButton>
        </EBF>
        {this.state.showConfirm ? <Confirm email={this.state.email} /> : null}
        <Space></Space>
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
        <Space></Space>
        <EBF>
          <CButton onClick={this.UpdatePW}>재설정</CButton>
        </EBF>
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

export default PW;
