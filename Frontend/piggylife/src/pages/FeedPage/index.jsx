import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";
import FeedCompo from "../../components/Feed";
import Statistic from "../../components/Statistic";
import { GridAlt } from "@styled-icons/boxicons-regular/GridAlt";
import { Graph } from "@styled-icons/octicons/Graph";
import { inject, observer } from "mobx-react";

export const Grid = styled(GridAlt)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  align-items: center;
`;

export const GraphIcon = styled(Graph)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  align-items: center;
`;

@inject("colorStore")
@observer
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
    this.props.colorStore.setMyFeedColor("#5897A6");
    this.props.colorStore.setStatisticColor("#cccccc");
  };
  StatisticClick = (e) => {
    this.setState({
      feed: false,
      statistic: true,
    });
    this.props.colorStore.setMyFeedColor("#cccccc");
    this.props.colorStore.setStatisticColor("#5897A6");
  };

  render() {
    return (
      <Frame>
        <Top>
          <Profile></Profile>
          <Tab>
            <FeedTab onClick={this.FeedClick}>
              <Grid color={this.props.colorStore.myfeed}></Grid>
            </FeedTab>
            <StatisticTab onClick={this.StatisticClick}>
              <GraphIcon color={this.props.colorStore.statistic}></GraphIcon>
            </StatisticTab>
          </Tab>
        </Top>
        <Content>
          <Bottom>
            {this.state.feed === true ? (
              <FeedCompo></FeedCompo>
            ) : (
              <Statistic></Statistic>
            )}
          </Bottom>
          {/* state로 true면 피드, false면 통계 */}
        </Content>
        <Navbar></Navbar>
      </Frame>
    );
  }
}

const Frame = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 205px auto 8vh;
  grid-template-areas: "Top" "Content" "Navbar";
`;

const Top = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
`;
const FeedTab = styled.div`
  height: 53px;
  border-right: solid 1px;
  border-color: #e6e6e6;
  display: flex;
  position: sticky;
  top: 0;
  justify-content: center;
  align-items: center;
`;
const StatisticTab = styled.div`
  height: 53px;
  border-bottom: solid 1px;
  border-color: #e6e6e6;
  display: flex;
  position: sticky;
  top: 0;
  justify-content: center;
  align-items: center;
`;
const Tab = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "FeedTab StatisticTab";
  border-top: solid 1px;
  border-bottom: solid 1px;
  border-color: #e6e6e6;
`;
const Bottom = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
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
