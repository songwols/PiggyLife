import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

class FeedPage extends React.Component {
  render() {
    return (
      <Frame>
        <Navbar></Navbar>
      </Frame>
    );
  }
}

const Frame = styled.div`
  height: 100vh;
`;

export default FeedPage;
