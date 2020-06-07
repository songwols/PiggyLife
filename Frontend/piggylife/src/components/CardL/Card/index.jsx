import React from "react";
import styled from "styled-components";
import logo from "./logo.png";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("storeStore")
@withRouter
@observer
class Card extends React.Component {
  render() {
    const DetailBtn = (e) => {
      e.preventDefault();
      this.props.history.push("/detail/" + this.props.store.sid);
    };
    const store = this.props.store;

    return (
      <F>
        <Frame onClick={DetailBtn}>
          <CardImg src={logo} className="img"></CardImg>
          <Title className="title">
            <T>{store.name}</T>
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
  margin-top: 0.15rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  /* object-fit: cover; */
  top: 0;
  left: 0;
  width: 95px;
  height: 95px;
  float: right;
  background-color: #cccccc;
  filter: brightness(75%);
`;

const Title = styled.div`
  font-size: x-Large;
  margin-left: 0.8rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  object-fit: cover;
  /* display: none; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  @media (max-width: 768px) {
  }
`;

const T = styled.div`
  white-space: pre-line;
  width: 70px;
  height: auto;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 20%;
  /* margin-left: 20%; */
  z-index: 10;
  font-size: 1.3rem;
`;

export default Card;
