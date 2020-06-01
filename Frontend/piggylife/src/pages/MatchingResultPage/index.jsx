import React from "react";
import Navbar from "../../components/Navbar";
import UserInfo from "../../components/MatchingContent/userInfo";
import styled from "styled-components";
import CardLayout from "../../components/CardL";
import icon from "./clipboard.png";

class MatchingResultPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Frame>
        <Content>
          <TopText>이인경 님과 박유진 님의 먹궁합 결과는</TopText>
          <Info>
            {/* <UserInfo></UserInfo> */}
            <Score>
              <Icon src={icon}></Icon>
              <div>70%</div>
            </Score>
            {/* <UserInfo></UserInfo> */}
          </Info>
          <Blank></Blank>
          <BothMukSpotlist>
            <Title>두분을 위한 MukSpot은 여기!</Title>
            <Cards></Cards>
          </BothMukSpotlist>
          <Blank></Blank>
          <NewMukSpotlist>
            <Title>새로운 곳은 어떤가요?</Title>
            <Cards></Cards>
          </NewMukSpotlist>
        </Content>

        <Navbar></Navbar>
      </Frame>
    );
  }
}
const Frame = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;
const Content = styled.div`
  display: grid;
  height: 86vh;
  width: 100%;
  grid-template-areas: "TopText" "Info" "Blank" "BothMukSpotlist" "Blank" "NewMukSpotlist";
  grid-template-rows: 0.5fr 3fr 0.3fr 2fr 0.3fr 2fr;
  margin-top: 1rem;
`;
const Info = styled.div`
  height: auto;
  display: grid;
  grid-template-areas: "UserInfo Score UserInfo";
  grid-template-columns: 2fr 1fr 2fr;
`;
const Score = styled.span`
  margin-top: 25px;
  text-align: center;
`;
const Icon = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 50px;
  object-fit: cover;
  margin: auto;
`;
const TopText = styled.div`
  align-self: center;
  margin-left: 1rem;
`;
const Title = styled.div`
  margin-left: 1rem;
`;
const BothMukSpotlist = styled.div``;
const NewMukSpotlist = styled.div``;
const Cards = styled.div`
  background-color: #ffe8bd;
  height: 90%;
`;
const Blank = styled.div``;
export default MatchingResultPage;
