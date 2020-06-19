/*global kakao*/
import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import dotenv from "dotenv";
import { withRouter } from "react-router-dom";
import will from "./will.png";
import went from "./went.png";
import currentimg from "./current.png";
import "./index.css";

dotenv.config();

@inject("storeStore")
@withRouter
@observer
class MapContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      visitMakersList: [],
      willgoMakersList: [],
      map: "",
    };
  }
  async componentWillMount() {
    const script = document.createElement("script");
    await this.props.storeStore.get_post(sessionStorage.getItem("uid"));
    const willgoMakers = this.props.storeStore.willGoLoc;
    const visitMakers = this.props.storeStore.visitLoc;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP}&autoload=false&libraries=services`;
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        var willgoMakersList = [];
        var visitMakersList = [];
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(37.5013068, 127.0396597),
          level: 5,
        };
        //map 생성
        const map = new window.kakao.maps.Map(container, options);
        this.setState({ map: map });

        // HTML5의 geolocation으로 사용할 수 있는지 확인
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function (position) {
            // var lat = position.coords.latitude, // 위도
            //   lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(37.5013068, 127.0396597), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              // var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              message = '<div style="padding:5px;">현재 여기계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);
          });
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          var locPosition = new kakao.maps.LatLng(37.5013068, 127.0396597),
            message = "geolocation을 사용할수 없어요..";
          displayMarker(locPosition, message);
        }
        // 마커 이미지
        var current = currentimg;

        // 지도에 마커와 인포윈도우를 표시하는 함수
        function displayMarker(locPosition, message) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: new kakao.maps.MarkerImage(
              current,
              new kakao.maps.Size(40, 40)
            ),
          });
          var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;
          // 인포윈도우를 생성
          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });
          // 인포윈도우를 마커위에 표시
          infowindow.open(map, marker);
          // 지도 중심좌표를 접속위치로 변경
          map.setCenter(locPosition);
        }

        // 마커 이미지
        var visited = went;
        var willvis = will;
        const createWillGoMarkers = () => {
          for (var i = 0; i < willgoMakers.length; i++) {
            var imageSize = new kakao.maps.Size(35, 35);
            var markerImage = null;
            markerImage = new kakao.maps.MarkerImage(willvis, imageSize);
            var marker = createMarker(willgoMakers[i], markerImage);
            var infowindow = this.createInfoWindow(willgoMakers[i]);
            kakao.maps.event.addListener(
              marker,
              "click",
              this.makeClickListener(map, marker, infowindow)
            );
            willgoMakersList.push(marker);
          }
          this.setState({
            willgoMakersList: willgoMakersList,
          });
        };
        const createVisitMarkers = () => {
          for (var i = 0; i < visitMakers.length; i++) {
            var imageSize = new kakao.maps.Size(35, 35);
            var markerImage = null;
            markerImage = new kakao.maps.MarkerImage(visited, imageSize);
            var marker = createMarker(visitMakers[i], markerImage);

            var infowindow = this.createInfoWindow(visitMakers[i]);
            // 인포윈도우를 마커위에 표시
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(
              marker,
              "click",
              this.makeClickListener(map, marker, infowindow)
            );
            visitMakersList.push(marker);
          }
          this.setState({
            visitMakersList: visitMakersList,
          });
        };
        createWillGoMarkers();
        createVisitMarkers();

        this.changeMarker("all");

        function createMarker(markerInfo, markerImage) {
          var marker = new kakao.maps.Marker({
            //map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(markerInfo.lat, markerInfo.long), // 마커를 표시할 위치
            title: markerInfo.name + markerInfo.address, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
            clickable: true,
          });
          return marker;
        }
      });
    };
  }
  createInfoWindow = (markerInfo) => {
    var infowindow = new kakao.maps.InfoWindow({
      content:
        "<a href=/mydetail/" +
        markerInfo.pid +
        ">" +
        markerInfo.name +
        "<br>" +
        markerInfo.address +
        "</a>",
      removable: true,
      clickable: true,
    });

    return infowindow;
  };
  makeClickListener = (map, marker, infowindow) => {
    return function () {
      infowindow.open(map, marker);
    };
  };
  setWillGoMarkers = (map) => {
    for (var i = 0; i < this.state.willgoMakersList.length; i++) {
      this.state.willgoMakersList[i].setMap(map);
    }
  };
  setVisitMarkers = (map) => {
    for (var i = 0; i < this.state.visitMakersList.length; i++) {
      this.state.visitMakersList[i].setMap(map);
    }
  };
  changeMarker = (type) => {
    if (type === "willgo") {
      this.setWillGoMarkers(this.state.map);
      this.setVisitMarkers(null);
    } else if (type === "visit") {
      this.setWillGoMarkers(null);
      this.setVisitMarkers(this.state.map);
    } else if (type === "all") {
      this.setWillGoMarkers(this.state.map);
      this.setVisitMarkers(this.state.map);
    }
  };
  //인포윈도우를 표시하는 클로저를 만드는 함수

  render() {
    return (
      <MapContents id="Mymap">
        <ul id="category">
          {/* <li id="BK9" data-order="0">  */}
          <li data-order="0" onClick={() => this.changeMarker("all")}>
            <span className="category_bg all"></span>
            전체
          </li>
          {/* <li id="MT1" data-order="1">  */}
          <li data-order="1" onClick={() => this.changeMarker("visit")}>
            <span className="category_bg went"></span>
            간곳
          </li>
          {/* <li id="PM9" data-order="2">  */}
          <li data-order="2" onClick={() => this.changeMarker("willgo")}>
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
