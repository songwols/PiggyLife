import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";
import FeedCompo from "../../components/Feed";
import Statistic from "../../components/Statistic";
import { GridAlt } from "@styled-icons/boxicons-regular/GridAlt";
import { Graph } from "@styled-icons/octicons/Graph";

export const Grid = styled(GridAlt)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: #cccccc;

  :hover {
    color: #5897a6;
  }
`;

export const GraphIcon = styled(Graph)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: #cccccc;
  align-items: center;
  :hover {
    color: #5897a6;
  }
`;

class FeedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: true,
      statistic: false,
    };
  }

  FeedClick = (e) => {
    this.setState({
      feed: true,
      statistic: false,
    });
    console.log(this.state.feed);
    console.log(this.state.statistic);
  };
  StatisticClick = (e) => {
    this.setState({
      feed: false,
      statistic: true,
    });
    console.log(this.state.feed);
    console.log(this.state.statistic);
  };

  render() {
    return (
      <Frame>
        <Feed>
          <Profile></Profile>
          <Content>
            <Tab>
              <FeedTab onClick={this.FeedClick}>
                <Grid></Grid>
              </FeedTab>
              <StatisticTab onClick={this.StatisticClick}>
                <GraphIcon></GraphIcon>
              </StatisticTab>
            </Tab>
            <Bottom>
              {this.state.feed === true ? (
                <FeedCompo></FeedCompo>
              ) : (
                <Statistic></Statistic>
              )}
            </Bottom>
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
  display: flex;

  justify-content: center;
  align-items: center;
`;
const StatisticTab = styled.div`
  height: 53px;
  border-bottom: solid 1px;
  border-color: #e6e6e6;
  display: flex;

  justify-content: center;
  align-items: center;
`;
const Tab = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "FeedTab StatisticTab";
  border-top: solid 1px;
  border-bottom: solid 1px;
  border-color: #e6e6e6;
`;
const Bottom = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;
const Feed = styled.div`
  display: grid;
  height: 92vh;
  grid-template-rows: 150px auto;
  grid-template-areas: "Profile" "Content";
`;
const Content = styled.div`
  display: grid;
  grid-template-rows: 55px auto;
  grid-template-areas: "Tab" "Bottom";
`;

export default FeedPage;
