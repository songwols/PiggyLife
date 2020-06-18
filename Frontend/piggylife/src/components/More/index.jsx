import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import CheckPopUp from "../EditPro/checkPopUp";

export const Links = styled
@inject("userStore", "storeStore")
@observer
class More extends React.Component {
  state = {
    click: false,
    infoW: false,
    store_name: "",
    address: "",
    check: true,
  };
  CheckPwdPopUp = (e) => {
    this.setState({
      click: !this.state.click,
    });
  };
  Logout = (e) => {
    this.props.userStore.logout();
  };
  addInfoPopup = (e) => {
    this.setState({
      infoW: !this.state.infoW,
    });
  };
  changename = (e)=>{
    this.setState({
      store_name: e.target.value,
      address : this.state.address,
    });
  }
  changeaddress = (e)=>{
    this.setState({
      store_name: this.state.store_name,
      address : e.target.value,
    });
  };
  goRequest = (e) => {
    this.props.storeStore.requestStore(this.state)
  }
  suggestList = (e) => {
    window.location.replace("/adminS")
  }

  async UNSAFE_componentWillMount() {
    await this.props.userStore.whoami(window.sessionStorage.getItem("email"))
  }

  render() {
    const check = this.props.userStore.superuser
    return (
      <Frame>
        <BF>
          <Button onClick={this.CheckPwdPopUp}>프로필 수정</Button>
        </BF>
        <Space></Space>
        {this.state.check ? (
          <div>
          <BF>
          <Button onClick={this.suggestList} keyword="all">추가된 데이터 조회</Button>
          </BF>
          <Space></Space>
        </div>
        ) : (
          <div>
            <BF>
              <Button onClick={this.addInfoPopup}>데이터 추가</Button>
            </BF>
            <Space></Space>
            <BF>
              <Button onClick={this.suggestList} keyword="mine">내가 요청한 데이터 조회</Button>
            </BF>
            <Space></Space>
          </div>
        )}
        <BF>
          <a href="https://pf.kakao.com/_fzqDxb">
            <Button>고객센터</Button>
          </a>
        </BF>
        <Space></Space>
        <BF>
          <Button onClick={this.Logout}>로그아웃</Button>
        </BF>
        {this.state.click ? (
          <CheckPopUp cancelCheck={this.CheckPwdPopUp.bind(this)} />
        ) : null}
        {this.state.infoW ? (
          <Popup>
          <PopupInner>
            <Box>
              <Title>가게 이름을 입력해주세요.</Title>
              <CheckInput placeholder="ex) 가나다분식 OO지점" value={this.state.store_name} onChange={this.changename}></CheckInput>
              <Title>가게 주소를 입력해주세요.</Title>
              <CheckInput placeholder="ex) OO여대 근처 혹은 정확한 주소지를 입력해주세요." value={this.state.address} onChange={this.changeaddress}></CheckInput>
              <BFrame>
              <Cancel onClick={this.addInfoPopup}>취소</Cancel>&nbsp;
                <OK onClick={this.goRequest} >확인</OK>
              </BFrame>
            </Box>
          </PopupInner>
      </Popup>
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
  margin-top: 10%;
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

const Popup = styled.div`
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const PopupInner = styled.div`
  position: absolute;
  left: 20%;
  right: 20%;
  top: 28%;
  bottom: 28%;
  margin: auto;
  background: white;

  border-radius: 4%;
  overflow: hidden;

  animation-name: zoom;
  animation-duration: 0.6s;

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

`;

const Box = styled.div`
  margin: 10% 10% 15% 10%;
  height: 85%;
  width: 80%;
  background-color: #ffe8bd;
  display: grid;
  // grid-template-rows: repeat(3,1fr);
  // grid-template-areas: "title" "searching" "bframe";

`
const Title = styled.div`
  grid-area: "title";
  display: flex; 
  align-items: center; 
  justify-content: center; 
  -webkit-justify-content: center; 
  -webkit-align-items: center;

`

const CheckInput = styled.input`
  grid-area: "searching";
  font-size: 1.0rem;
  margin-top: .3rem;
  margin-left: .4rem;
  width: 90%;
  padding-left: .3rem;
  background: none;
  border-color: gray;
  border-style: solid;
  outline: none;
  box-shadow: none;
  border-width: 0.05rem;
  height: 2rem;
  border-top: hidden;
  border-left: hidden;
  border-right: hidden;
`


const Cancel = styled.button`
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #F28379;
`

const OK = styled.button`
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #5897A6;
`
const BFrame = styled.div`
  grid-area: "bframe";
  margin-top: .3rem;
  height: 2rem;
  text-align: center;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  -webkit-justify-content: center; 
  -webkit-align-items: center;
`

export default More;
