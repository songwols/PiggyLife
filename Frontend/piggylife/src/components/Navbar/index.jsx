import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Home4 } from "@styled-icons/remix-line/Home4";
import { PlusCircle } from "@styled-icons/boxicons-regular/PlusCircle";
import { Map } from "@styled-icons/boxicons-regular/Map";
import { UserHeart } from "@styled-icons/remix-line/UserHeart";
import { GridAlt } from "@styled-icons/boxicons-regular/GridAlt";
import { inject, observer } from "mobx-react";

export const Home = styled(Home4)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
`;
export const Feed = styled(GridAlt)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
`;
export const Muk = styled(UserHeart)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
`;
export const MapIcon = styled(Map)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
`;

export const Post = styled(PlusCircle)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
`;

@inject("colorStore")
@observer
class Navbar extends React.Component {
  HomeClick = (e) => {
    this.props.colorStore.setHomeColor("#5897A6");
    this.props.colorStore.setFeedColor("#cccccc");
    this.props.colorStore.setPostColor("#cccccc");
    this.props.colorStore.setMapColor("#cccccc");
    this.props.colorStore.setMatchColor("#cccccc");
    this.props.colorStore.setMyFeedColor("#5897A6");
    this.props.colorStore.setStatisticColor("#cccccc");
  };
  FeedClick = (e) => {
    this.props.colorStore.setHomeColor("#cccccc");
    this.props.colorStore.setFeedColor("#5897A6");
    this.props.colorStore.setPostColor("#cccccc");
    this.props.colorStore.setMapColor("#cccccc");
    this.props.colorStore.setMatchColor("#cccccc");
    this.props.colorStore.setMyFeedColor("#5897A6");
    this.props.colorStore.setStatisticColor("#cccccc");
  };
  PostClick = (e) => {
    this.props.colorStore.setHomeColor("#cccccc");
    this.props.colorStore.setFeedColor("#cccccc");
    this.props.colorStore.setPostColor("#5897A6");
    this.props.colorStore.setMapColor("#cccccc");
    this.props.colorStore.setMatchColor("#cccccc");
    this.props.colorStore.setMyFeedColor("#5897A6");
    this.props.colorStore.setStatisticColor("#cccccc");
  };
  MapClick = (e) => {
    this.props.colorStore.setHomeColor("#cccccc");
    this.props.colorStore.setFeedColor("#cccccc");
    this.props.colorStore.setPostColor("#cccccc");
    this.props.colorStore.setMapColor("#5897A6");
    this.props.colorStore.setMatchColor("#cccccc");
    this.props.colorStore.setMyFeedColor("#5897A6");
    this.props.colorStore.setStatisticColor("#cccccc");
  };
  MatchClick = (e) => {
    this.props.colorStore.setHomeColor("#cccccc");
    this.props.colorStore.setFeedColor("#cccccc");
    this.props.colorStore.setPostColor("#cccccc");
    this.props.colorStore.setMapColor("#cccccc");
    this.props.colorStore.setMatchColor("#5897A6");
    this.props.colorStore.setMyFeedColor("#5897A6");
    this.props.colorStore.setStatisticColor("#cccccc");
  };
  render() {
    return (
      <Frame>
        <HOME>
          <Link to={"/Home"} style={{ textDecoration: "none" }}>
            <Home
              onClick={this.HomeClick}
              color={window.sessionStorage.getItem("home")}
            ></Home>
          </Link>
        </HOME>
        <FEED>
          <Link to={"/Feed"} style={{ textDecoration: "none" }}>
            <Feed
              onClick={this.FeedClick}
              color={window.sessionStorage.getItem("feed")}
            ></Feed>
          </Link>
        </FEED>
        <POST>
          <Link to={"/Write"} style={{ textDecoration: "none" }}>
            <Post
              onClick={this.PostClick}
              color={window.sessionStorage.getItem("post")}
            ></Post>
          </Link>
        </POST>
        <MAP>
          <Link to={"/Map"} style={{ textDecoration: "none" }}>
            <MapIcon
              onClick={this.MapClick}
              color={window.sessionStorage.getItem("map")}
            ></MapIcon>
          </Link>
        </MAP>

        <Match>
          <Link to={"/Match"} style={{ textDecoration: "none" }}>
            <Muk
              onClick={this.MatchClick}
              color={window.sessionStorage.getItem("match")}
            ></Muk>
          </Link>
        </Match>
      </Frame>
    );
  }
}

const HOME = styled.div`
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
`;
const FEED = styled.div`
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
`;
const POST = styled.div`
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
`;
const MAP = styled.div`
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
`;
const Match = styled.div`
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
`;

const Frame = styled.div`
  background-color: white;
  border-top: solid 1px;
  border-color: #e6e6e6;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 8vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "HOME" "FEED" "POST" "MAP" "Match";
`;

export default Navbar;
