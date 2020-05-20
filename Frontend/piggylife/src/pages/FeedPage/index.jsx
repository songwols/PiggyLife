import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";

class FeedPage extends React.Component {
  render() {
    return (
      <Frame>
        <Feed>
          <Profile></Profile>
          <Content>
            <Tab>
              <FeedTab></FeedTab>
              <StatisticTab></StatisticTab>
            </Tab>
            <Bottom></Bottom>
            {/* state로 true면 피드, false면 통계 */}
          </Content>
        </Feed>
        <Navbar></Navbar>
      </Frame>
    );
  }
}

const Frame = styled.div`
  height: 100vh;
`;
const FeedTab = styled.div`
  height: 53px;
  border-right: solid 1px;
  border-color: #e6e6e6;
`;
const StatisticTab = styled.div`
  height: 53px;
  border-bottom: solid 1px;
  border-color: #e6e6e6;
`;
const Tab = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "FeedTab" "StatisticTab";
  border-top: solid 1px;

  border-color: #e6e6e6;
`;
const Bottom = styled.div``;
const Feed = styled.div`
  display: grid;
  height: 92vh;
  grid-template-areas: "Profile" "Content";
  grid-template-rows: 150px auto;
`;
const Content = styled.div`
  display: grid;
  grid-template-areas: "Tab" "Bottom";
  grid-template-rows: 55px auto;
`;

export default FeedPage;
