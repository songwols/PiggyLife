import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Card from "./Card";

//@inject("스토어이름")
//@observer
class CardLayout extends React.Component {
  state = {};

  render() {
    const returns = this.props.list;
    console.log(returns);
    return (
      <div>
        {returns ? 
        <Frame>
          {/* returns.map((item, index) => <Card key={index} store={item} />) */}
        </Frame>
      :
      <NFrame>
        <Text>등록된 게시글이 없습니다.</Text>
      </NFrame>
      }
      </div>
    );
  }
}
const Text = styled.div`
  margin-top: 40px;
`;

const NFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Frame = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  grid-area: List;
  display: grid;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: repeat(auto-fit, 29%);
  grid-template-rows: repeat(auto-fit, 1fr);
`;

export default CardLayout;
