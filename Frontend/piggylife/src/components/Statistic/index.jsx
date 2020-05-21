import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class Statistic extends React.Component {
  render() {
    return (
      <Frame>
        <Div>통계</Div>
        {/* {returns ? (
              returns.map((item, index) => <Card key={index} store={item} />)
            ) : (
              <></>
            )} */}
      </Frame>
    );
  }
}

const Frame = styled.div``;
const Div = styled.div`
  justify-content: center;
  align-items: center;
`;

export default Statistic;
