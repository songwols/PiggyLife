import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

class MapPage extends React.Component {
  render() {
    return (
      <Frame>
        <Map>여기에카카오맵이들어갈거</Map>
        <Navbar></Navbar>
      </Frame>
    );
  }
}

const Frame = styled.div`
  height: 100vh;
`;

const Map = styled.div``;

export default MapPage;
