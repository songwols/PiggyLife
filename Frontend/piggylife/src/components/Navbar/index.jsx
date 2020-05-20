import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Home4 } from "@styled-icons/remix-line/Home4";
import { PlusCircle } from "@styled-icons/boxicons-regular/PlusCircle";
import { Map } from "@styled-icons/boxicons-regular/Map";
import { UserHeart } from "@styled-icons/remix-line/UserHeart";
import { GridAlt } from "@styled-icons/boxicons-regular/GridAlt";

export const Home = styled(Home4)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #5897a6;
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
  :hover {
    color: #5897a6;
  }
`;
export const Feed = styled(GridAlt)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #cccccc;
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
  :hover {
    color: #5897a6;
  }
`;
export const Muk = styled(UserHeart)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #cccccc;
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
  :hover {
    color: #5897a6;
  }
`;
export const MapIcon = styled(Map)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #cccccc;
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
  :hover {
    color: #5897a6;
  }
`;

export const Post = styled(PlusCircle)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #cccccc;
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
  :hover {
    color: #5897a6;
  }
`;
class Navbar extends React.Component {
  render() {
    return (
      <Frame>
        <Home></Home>
        <Feed></Feed>
        <Post></Post>
        <MapIcon></MapIcon>
        <Muk></Muk>
      </Frame>
    );
  }
}

const Frame = styled.div`
  border-top: solid 1px;
  border-color: #e6e6e6;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 8vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "Home" "Feed" "Post" "MapIcon" "Muk";
`;

export default Navbar;
