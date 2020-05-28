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
      <Frame>
        {returns ? (
          returns.map((item, index) => <Card key={index} store={item} />)
        ) : (
          // <Text>등록된 게시글이 없습니다.</Text>
          <></>
        )}
        {/* <Card></Card> */}
      </Frame>
    );
  }
}
const Text = styled.div``;
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
