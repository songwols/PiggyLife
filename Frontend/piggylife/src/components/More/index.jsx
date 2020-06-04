import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import CheckPopUp from "../EditPro/checkPopUp";
@inject("userStore")
@observer
class More extends React.Component {
  state={
    click : false
   };
  CheckPwdPopUp = (e)=>{
    this.setState({
      click: !this.state.click
    })
  }
  Logout = (e) => {
    this.props.userStore.logout();
  };

  render() {
    return (
      <Frame>
        <BF>
          <Button onClick={this.CheckPwdPopUp}>프로필 수정</Button>
        </BF>
        <Space></Space>
        <BF>
          <Button onClick={this.Logout}>로그아웃</Button>
        </BF>
        <Space></Space>
        <BF>
          <a href="https://pf.kakao.com/_fzqDxb">
            <Button>고객센터</Button>
          </a>
        </BF>
        {this.state.click ? (
            <CheckPopUp cancelCheck={this.CheckPwdPopUp.bind(this)}/>
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
  // height: 100%;
  padding: 10%;
  margin-top: 45%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
`;

const BF = styled.div`
  text-align: center;
  width: 95%;
`;

const Button = styled.button`
  margin-top: 0.3rem;
  width: 80%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #5897a6;
`;

export default More;
