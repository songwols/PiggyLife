import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class FeedCompo extends React.Component {
  render() {
    return (
      <Frame>
        <Div>등록된 게시글이 없습니다.</Div>
        {/* {returns ? (
              returns.map((item, index) => <Card key={index} store={item} />)
            ) : (
              <></>
            )} */}
      </Frame>
    );
  }
}

const Frame = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;
const Div = styled.div`
  margin-top: 3rem;
`;

export default FeedCompo;
