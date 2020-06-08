import React from "react";
import styled from "styled-components";
import logo from "./logo_match.png";
import { inject, observer } from "mobx-react";
import loading from "./loading.gif";

@inject("userStore")
@observer
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendID: "",
      loading: false,
    };
  }

  onIDChange = (e) => {
    this.setState({
      friendID: e.target.value,
    });
  };

  Matching = (e) => {
    this.setState({
      loading: true,
    });
    const email = this.state.friendID;
    if (email === window.sessionStorage.getItem("email")) {
      alert("자기 자신과는 매칭할 수 없습니다!");
    } else {
      setTimeout(() => {
        
      }, 5000);
      this.props.userStore.findByEmail(email);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <Popup>
          <PopupInner>
            <LIF>
              <LI src={loading}></LI>
            </LIF>
          </PopupInner>
        </Popup>
      );
    }
    return (
      <Content>
        <Box1>
          <Img src={logo}></Img>
        </Box1>
        <Box2>
          <Input
            onChange={this.onIDChange}
            placeholder="궁합 상대의 메일을 넣어주세요"
            value={this.state.friendID}
            name="friendId"
          ></Input>
          <EBF>
            <CButton onClick={this.Matching}>Search</CButton>
          </EBF>
        </Box2>
      </Content>
    );
  }
}
const Content = styled.div`
  height: auto;
  padding: 10%;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  align-items: center;
  margin-top: 6rem;
`;
const Box1 = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  object-fit: cover;
  margin: auto;
`;
const Img = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 170px;
  object-fit: cover;
  margin: auto;
`;
const Box2 = styled.div`
  background-color: #ffe8bd;
  border-radius: 0.5rem;
  padding: 5% 10% 5% 10%;
`;
const Input = styled.input`
  font-size: 1rem;
  margin-top: 0.3rem;
  width: 98%;
  padding-left: 0.3rem;
  background: none;
  background-color: #ffffff;
  border-color: gray;
  border-style: solid;
  border-radius: 0.3rem;
  outline: none;
  box-shadow: none;
  border-width: 0.05rem;
  height: 2rem;
  text-align: center;
`;

const EBF = styled.div`
  text-align: center;
`;

const CButton = styled.button`
  margin-top: 0.7rem;
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #ff7566;
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
  top: 20%;
  bottom: 20%;
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
const LIF = styled.div`
  margin: 45% 10% 45% 10%;
  height: 60%;
  width: 80%;
`;

const LI = styled.img`
  justify-content: center;
  align-items: center;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 95%;
`;

export default Search;
