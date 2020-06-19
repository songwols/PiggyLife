/*global kakao*/
import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import dotenv from "dotenv";
import { withRouter } from "react-router-dom";
import will from './will.png'
import went from './went.png'
import currentimg from './current.png'
import './index.css'

dotenv.config();

@inject("storeStore")
@withRouter
@observer
class MapContent extends React.Component {
  constructor(props){
    super(props);
    this.state={
        latitude: "",
        longitude: "",
        visitMakersList: [],
        willgoMakersList: [],
    }
  }
  // visitMakersList = []
  
  // map;
  async componentWillMount() {    
    
    const script = document.createElement("script");
    await this.props.storeStore.get_post(sessionStorage.getItem("uid"));
    const willgoMakers = this.props.storeStore.willGoLoc;
    const visitMakers = this.props.storeStore.visitLoc;
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP}&autoload=false&libraries=services`;
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        var willgoMakersList=[];
        var visitMakersList=[];
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(37.5013068, 127.0396597),
          level: 5
        };
        //map 생성
        const map = new window.kakao.maps.Map(container, options);
        // createWillGoMarkers();
        // console.log(willgoMakerList);
        // console.log(visitMakerList);
        // 마커 이미지
        var visited = went; 
        var willvis = will;
        const createWillGoMarkers=()=>{
          for(var i =0; i <willgoMakers.length ;i++){
            var imageSize = new kakao.maps.Size(35, 35);
            var markerImage = null;
            markerImage = new kakao.maps.MarkerImage(willvis, imageSize);
            var marker = createMarker(willgoMakers[i],markerImage);
            willgoMakersList.push(marker);
            
          }
          this.setState({willgoMakersList: willgoMakersList});
        }
        const createVisitMarkers=()=>{
          for(var i =0; i <visitMakers.length ;i++){
            var imageSize = new kakao.maps.Size(35, 35);
            var markerImage = null;
            markerImage = new kakao.maps.MarkerImage(visited, imageSize);
            var marker = createMarker(visitMakers[i],markerImage);
            visitMakersList.push(marker);
            
          }
          this.setState({visitMakersList: visitMakersList});
        }
        createWillGoMarkers();
        createVisitMarkers();

        changeMarker('all');

        function createMarker(markerInfo, markerImage){
          var marker = new kakao.maps.Marker({
            //map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(markerInfo.lat, markerInfo.long), // 마커를 표시할 위치
            title : markerInfo.name + markerInfo.address, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage, // 마커 이미지 
            clickable: true,

          });
          return marker;

        }
        
        function setWillGoMarkers(map){
          for(var i =0; i <willgoMakersList.length ;i++){
            willgoMakersList[i].setMap(map);
            
          }
        }
        function setVisitMarkers(map){
          for(var i =0; i <visitMakersList.length ;i++){
            visitMakersList[i].setMap(map);
            
          }
        }
        function changeMarker(type){
          if(type ==='willgo'){
            setWillGoMarkers(map);
            setVisitMarkers(null);
          }else if(type == 'visit'){
            setWillGoMarkers(null);
            setVisitMarkers(map);
          }else{
            setWillGoMarkers(map);
            setVisitMarkers(map);
          }

        }

      });

    }
} 

  render() {    
    return (
      <MapContents id="Mymap">
    <ul id="category">
        {/* <li id="BK9" data-order="0">  */}
        <li data-order="0" onClick={this.changeMarker('all').bind(this)}>
            <span className="category_bg all"></span>
            전체
        </li >       
        {/* <li id="MT1" data-order="1">  */}
        <li data-order="1" onClick={()=>this.changeMarker('visit')}>
            <span className="category_bg went"></span>
            간곳
        </li >  
        {/* <li id="PM9" data-order="2">  */}
        <li data-order="2">
            <span className="category_bg willgo"></span>
            갈곳
        </li>  
             
    </ul>
      </MapContents>
    );
  }
}

const MapContents = styled.div`
  width: 100%;
  height: 92vh;
  // position: relative;
  z-index: 0;
`;


export default MapContent;
