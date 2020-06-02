import React from "react";
import styled from "styled-components";
import logo from "./logo.png";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

//@inject("스토어이름")
//@withRouter
//@observer
class Card extends React.Component {
  render() {
    //const {post}=this.props; 이전 페이지에서 보낸 애
    const DetailBtn = (e) => {
      e.preventDefault();
      // this.props.history.push("/detail/" + post.store_id);
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
  border-radius: 0.5rem;
  cursor: pointer;
  padding-right: 3rem;
`;

const CardImg = styled.img`
  margin-top: 1rem;
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

export default Card;
