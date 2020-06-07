import React from "react";
import styled from "styled-components";
import dft from "./default.png";
import stamp from "./스탬프y.png";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("storeStore")
@withRouter
@observer
class Card extends React.Component {
  render() {
    const DetailBtn = (e) => {
      e.preventDefault();
      this.props.history.push("/mydetail/" + this.props.store.pid);
    };

    return (
      <Frame onClick={DetailBtn}>
        <F>
          {this.props.store.image === null || this.props.store.image === "" ? (
            <div>
              {this.props.store.visited === true ? (
                <CoverImg src={stamp}></CoverImg>
              ) : null}
              <CardImg src={dft}></CardImg>
            </div>
          ) : (
            <div>
              {this.props.store.visited === true ? (
                <CoverImg src={stamp}></CoverImg>
              ) : null}
              <CardImg src={this.props.store.image}></CardImg>
            </div>
          )}
        </F>
      </Frame>
    );
  }
}

const F = styled.div`
  z-index: -1;
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 100%;
  top: 0;
  left: 0;
`;

const Frame = styled.button`
  background: none;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
`;

const CardImg = styled.img`
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CoverImg = styled.img`
  position: absolute;
  object-fit: cover;
  top: 0;
  right: 0;
  width: 40%;
  height: 40%;
  z-index: 10;
`;

export default Card;
