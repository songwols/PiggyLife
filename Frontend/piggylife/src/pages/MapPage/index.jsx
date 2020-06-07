import React from "react";
import styled from "styled-components";
import Map from "../../components/Map"
import Navbar from "../../components/Navbar";

class MapPage extends React.Component {
  render() {
    return (
      <Frame>
        <Map></Map>
        <Navbar></Navbar>
      </Frame>
    );
  }
}

const Frame = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 8vh;
  grid-template-areas: "map" "navbar";
`;

export default MapPage;
