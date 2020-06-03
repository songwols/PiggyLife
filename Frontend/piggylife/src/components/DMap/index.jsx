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
    if(this.props.keyword === "detail"){
      await this.props.storeStore.detail(this.props.id);
      const post = this.props.storeStore.detailPost;
      this.setState({
        latitude: post.latitude,
        longitude: post.longitude,
      })
    }
    else if(this.props.keyword === "mydetail"){
      await this.props.storeStore.mydetail(this.props.id);
      const mpost = this.props.storeStore.mydetailPost;
      this.setState({
        latitude: mpost.store.latitude,
        longitude: mpost.store.longitude,
    })
    }
       
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
        const lati= this.state.latitude;
        const long= this.state.longitude;
        let options = {
          center: new kakao.maps.LatLng(lati, long),
          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition  = new kakao.maps.LatLng(
          this.state.latitude, this.state.longitude
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
  height: 46vh;
  position: relative;
  z-index: -1;
`;


export default MapContent;
