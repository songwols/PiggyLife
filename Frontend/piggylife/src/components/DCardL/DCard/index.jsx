import React from "react";
import styled from "styled-components";
import logo from "./logo.png";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("storeStore")
@withRouter
@observer
class DCard extends React.Component {
  render() {
    const DetailBtn = (e) => {
      e.preventDefault();
      this.props.history.push("/mydetail/" + this.props.store.pid);
    };

    return (
      <F>
        <Frame onClick={DetailBtn}>
          <CardImg src={logo} className="img" />
          <Title className="title">
            <T>제목</T>
          </Title>
        </Frame>
      </F>
    );
  }
}

const F = styled.div`
  /* border: 1.5px solid black; */
  float: right;
  position: relative;
  display: block;
  width: 80px;
  height: 0;
  overflow: hidden;
  padding-bottom: 100%;
  padding-right: 1rem;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const Frame = styled.button`
  background: none;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-right: 3rem;
`;

const CardImg = styled.img`
  margin-top: .8rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  /* object-fit: cover; */
  top: 0;
  left: 0;
  width: 75px;
  height: 75px;
  float: right;
`;

const Title = styled.div`
  font-size: x-Large;
  color: black;
  position: absolute;
  object-fit: cover;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
  }
`;

const T = styled.div`
  position: absolute;
  margin-top: 45%;
  margin-left: 20%;
  z-index: 10;
`;

export default DCard;
