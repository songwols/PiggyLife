import React from "react";
import styled from "styled-components";
import dft from "./default.png";
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
    const store = this.props.store;
    return (
      <F>
        <Frame onClick={DetailBtn}>
        {(this.props.store.image===null || this.props.store.image==="") ? 
        <CardImg src={dft} className="img" />
        :
        <CardImg src={this.props.store.image} className="img" />  
        }
          
          <Title className="title">
            <T>{store.store.name}</T>
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
  color: white;
  position: absolute;
  white-space: pre-line;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 70px;
  height: 100%;
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
  margin-top: 30%;
  /* margin-left: 20%; */
  z-index: 10;
  font-size: 1.3rem;
`;

export default DCard;
