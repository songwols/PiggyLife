/*global kakao*/
import React from "react";
import styled from "styled-components";
import dotenv from "dotenv";

dotenv.config();

class MapContent extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7
        };

        const map = new window.kakao.maps.Map(container, options);
     
      });
    };
  }
  render() {
    return (
      <MapContents id="Mymap"></MapContents>
    );
  }
}

const MapContents = styled.div`
  width: 100%;
  height: 92vh;
`;


export default MapContent;
