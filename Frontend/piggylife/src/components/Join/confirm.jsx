import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("userStore")
@observer
class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
    };
  }
  onCodeChange = (e) => {
    this.setState({
      code: e.target.value,
    });
  };
  CodeCheck = (e) => {
    const user = {
      email: this.props.email,
      code: this.state.code,
    };
    this.props.userStore.code_check(user);
  };
  render() {
    return (
      <div>
        <EConfirm
          placeholder="인증코드 입력해주세요"
          onChange={this.onCodeChange}
          name="code"
          value={this.state.code}
        ></EConfirm>
        <EBF>
          <EButton onClick={this.CodeCheck}>인증 확인</EButton>
        </EBF>
      </div>
    );
  }
}

const EConfirm = styled.input`
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
  background-color: #f28379;
`;

export default Confirm;
