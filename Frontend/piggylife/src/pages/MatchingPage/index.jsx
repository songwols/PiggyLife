import React from "react";
import Search from "../../components/MatchingContent/search";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
//import { Link } from "react-router-dom";
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
  
`;

export default MatchingPage;
