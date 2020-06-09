import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import CardLayout from "../../components/CardL";
import DCardLayout from "../../components/DCardL";
import { inject, observer } from "mobx-react";

@inject("storeStore", "userStore")
@observer
class HomePage extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.userStore.whoami(window.sessionStorage.getItem("email"));
  }

  render() {
    const nickname = this.props.userStore.nickname;
    return (
      <Frame>
        <List>
          <Mukitlist>
            <Title>"{nickname}" 님의 먹킷리스트</Title>
            <Div>
              <DCardLayout keyword="mypost"></DCardLayout>
            </Div>
          </Mukitlist>

          <Top10>
            <Title>이 달의 MukSpot-TOP10</Title>
            <Div>
              <CardLayout keyword="top10"></CardLayout>
            </Div>
          </Top10>

          <Place>
            <Title>"{nickname}" 님이 자주 방문하는 지역의 추천 맛집</Title>
            <Div>
              <CardLayout keyword="hotplace"></CardLayout>
            </Div>
          </Place>

          <User>
            <Title>"{nickname}" 님과 비슷한 먹유저들의 MukSpot</Title>
            <Div>
              <CardLayout keyword="similar"></CardLayout>
            </Div>
          </User>
        </List>
        <Navbar></Navbar>
      </Frame>
    );
  }
}

const Title = styled.div`
  margin-left: 1rem;
`;

const Div = styled.div`
  background-color: #f2e9e4;
  width: 100vw;
  height: 100px;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const Mukitlist = styled.div``;

const Top10 = styled.div``;

const Place = styled.div``;

const User = styled.div``;

const Frame = styled.div`
  height: 100vh;
`;
const List = styled.div`
  display: grid;
  height: 92vh;
  grid-template-areas: "Mukitlist" "Top10" "Place" "User";

  margin-top: 1rem;
`;

export default HomePage;
