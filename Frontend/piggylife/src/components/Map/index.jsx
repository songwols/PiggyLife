/*global kakao*/
import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import dotenv from "dotenv";

dotenv.config();

@inject("storeStore")
@observer
class MapContent extends React.Component {
  constructor(props){
    super(props);
    this.state={
        latitude: "",
        longitude: "",
    }
  }
  async componentWillMount(){
    await this.props.storeStore.get_mypost(sessionStorage.getItem("uid"));
    const list = this.props.storeStore.location;
    console.log(list)
    
  }

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
          center: new kakao.maps.LatLng(37.19, 127.07),
          level: 7
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition  = new kakao.maps.LatLng(
          37.19, 127.07
        ); 
        const marker = new kakao.maps.Marker({position: markerPosition});

        marker.setMap(map);
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
