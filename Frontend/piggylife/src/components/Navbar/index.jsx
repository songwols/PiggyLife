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
        <HOME>
          <Link to={"/Home"} style={{ textDecoration: "none" }}>
            <Home></Home>
          </Link>
        </HOME>
        <FEED>
          <Link to={"/Feed"} style={{ textDecoration: "none" }}>
            <Feed></Feed>
          </Link>
        </FEED>
        <POST>
          <Link to={"/Write"} style={{ textDecoration: "none" }}>
            <Post></Post>
          </Link>
        </POST>
        <MAP>
          <Link to={"/Map"} style={{ textDecoration: "none" }}>
            <MapIcon></MapIcon>
          </Link>
        </MAP>

        <MUK>
          <Link to={"/Match"} style={{ textDecoration: "none" }}>
            <Muk></Muk>
          </Link>
        </MUK>
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
const MUK = styled.div`
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
  grid-template-areas: "HOME" "FEED" "POST" "MAP" "MUK";
`;

export default Navbar;
