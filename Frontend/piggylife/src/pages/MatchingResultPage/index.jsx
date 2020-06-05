import React from "react";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import MatchingResult from "../../components/MatchingResult";

const MatchingResultPage = ({ match }) => {
  return (
      <Frame>
          <MatchingResult id={match.params.fid}></MatchingResult>
         <Navbar></Navbar>
      </Frame>
    );
}
const Frame = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

export default MatchingResultPage;
