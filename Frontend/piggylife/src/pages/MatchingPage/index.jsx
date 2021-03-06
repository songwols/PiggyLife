import React from "react";
import Search from "../../components/MatchingContent/search";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

class MatchingPage extends React.Component {
  render() {
    return (
      <Frame>
        <Search></Search>
        <Navbar></Navbar>
      </Frame>
    );
  }
}
const Frame = styled.div`
  height: 100vh;
  align-items: center; 
  text-align:center;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default MatchingPage;
