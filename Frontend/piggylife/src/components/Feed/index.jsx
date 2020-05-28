import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Card from "./Card";

//@inject("스토어이름")
//@observer
class FeedCompo extends React.Component {
  state={
    count: 1,
  }

  componentWillMount(){
    //데이터 가져올 스토어 처리
  }

  render() {
    return (
      <div>
      {this.state.count==0 ? 
        <NFrame>
        <Div>등록된 게시글이 없습니다.</Div>
        </NFrame>
      :
        <Frame>
          {/* {returns ? (
              returns.map((item, index) => <Card key={index} store={item} />)
            ) : (
              <></>
            )} */}
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </Frame>
      }
      </div>
    );
  }
}

const NFrame = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  margin-top: 3rem;
`;

const Frame = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, 33.2%);
  grid-template-rows: repeat(auto-fit, 1fr);

`
export default FeedCompo;
