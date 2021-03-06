import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("userStore")
@observer
class Secession extends React.Component {
  deleteUser = (e) => {
    this.props.userStore.deleteUser(window.sessionStorage.getItem("token"));
  };
  render() {
    return (
      <Popup>
        <PopupInner>
          <Box>
            <Title>탈퇴하시겠습니까?</Title>
            <BFrame>
              <BF>
                <Cancel onClick={this.props.cancelSecession}>취소</Cancel>&nbsp;
                <OK onClick={this.deleteUser}>확인</OK>
              </BF>
            </BFrame>
          </Box>
        </PopupInner>
      </Popup>
    );
  }
}

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
  top: 30%;
  bottom: 30%;
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
  margin: 35% 10% 45% 10%;
  height: 40%;
  width: 80%;
  background-color: #ffe8bd;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas: "title" "bframe";
`;
const Title = styled.div`
  grid-area: "title";
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  -webkit-align-items: center;
`;

const BFrame = styled.div`
  grid-area: "bframe";
  margin-top: 0.3rem;
  height: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  -webkit-align-items: center;
`;

const Cancel = styled.button`
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #f28379;
`;

const BF = styled.div`
  text-align: center;
  width: 95%;
`;

const OK = styled.button`
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #5897a6;
`;

export default Secession;
