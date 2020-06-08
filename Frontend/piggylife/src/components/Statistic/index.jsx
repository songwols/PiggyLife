import React from "react";
import styled from "styled-components";
import LevelGraph from "../LevelGraph";
import PlaceGraph from "../PlaceGraph";
import CategoryGraph from "../CategoryGraph";
import 기사돼지 from "./기사돼지.png";
import 남작돼지 from "./남작돼지.png";
import 로얄돼지 from "./로얄돼지.png";
import 아기돼지 from "./아기돼지.png";
import 어린돼지 from "./어린돼지.png";
import 청년돼지 from "./청년돼지.png";
import 평민돼지 from "./평민돼지.png";
import { inject, observer } from "mobx-react";

@inject("statisticStore", "userStore", "storeStore")
@observer
class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: {},
      category: [],
      ranking: 0,
      rname: "",
      best: {
        area: "",
        city: "",
        cnt: "",
      },
      img: "",
      startnum: 0,
      mylength: 0,
      remainnum: 0,
      goalnum: 0,
      done: 0,
      todo: 0,
      nickname: "",
    };
  }
  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0);
    this.props.statisticStore.getAreaStatistic(
      window.sessionStorage.getItem("uid")
    );
    this.props.statisticStore.getCategoryStatistic(
      window.sessionStorage.getItem("uid")
    );
    this.props.userStore.whoami(window.sessionStorage.getItem("email"));
    this.props.storeStore.get_post(window.sessionStorage.getItem("uid"));
  }
  render() {
    this.nickname = this.props.userStore.nickname;
    this.area = this.props.statisticStore.areaList;
    this.category = this.props.statisticStore.categoryList;
    this.ranking = this.props.userStore.ranking;
    this.rname = this.props.userStore.rname;
    this.mylength = this.props.storeStore.postslength;
    this.best = this.props.statisticStore.bestarea;
    if (this.ranking === 0) {
      this.goalnum = 10;
      this.startnum = 0;
      this.img = 아기돼지;
    } else if (this.ranking === 1) {
      this.goalnum = 20;
      this.startnum = 10;
      this.img = 어린돼지;
    } else if (this.ranking === 2) {
      this.goalnum = 30;
      this.startnum = 20;
      this.img = 청년돼지;
    } else if (this.ranking === 3) {
      this.goalnum = 50;
      this.startnum = 30;
      this.img = 평민돼지;
    } else if (this.ranking === 4) {
      this.goalnum = 70;
      this.startnum = 50;
      this.img = 기사돼지;
    } else if (this.ranking === 5) {
      this.goalnum = 90;
      this.startnum = 70;
      this.img = 남작돼지;
    } else if (this.ranking === 6) {
      this.goalnum = 120;
      this.startnum = 90;
      //this.img = 자작돼지;
    } else if (this.ranking === 7) {
      this.goalnum = 150;
      this.startnum = 120;
      // this.img = 백작돼지;
    } else if (this.ranking === 8) {
      this.goalnum = 180;
      this.startnum = 150;
      //this.img = 후작돼지;
    } else if (this.ranking === 9) {
      this.goalnum = 230;
      this.startnum = 180;
      // this.img = 공작돼지;
    } else if (this.ranking === 10) {
      this.startnum = 230;
      this.img = 로얄돼지;
    }
    this.remainnum = this.goalnum - this.mylength;
    this.done =
      (100 / (this.goalnum - this.startnum)) * (this.mylength - this.startnum) +
      "%";
    this.todo = (100 / (this.goalnum - this.startnum)) * this.remainnum + "%";
    return (
      <Frame>
        <LFrame>
          <LevelGraph
            done={this.done}
            todo={this.todo}
            ranking={this.ranking}
          ></LevelGraph>
        </LFrame>
        <Level>
          <Div1>
            <br></br>"{this.nickname}" 님의 돼지력은
          </Div1>
          <Div2>
            <Piggy>
              "Lv.{this.ranking} {this.rname}"
            </Piggy>
            <PiggyImg src={this.img}></PiggyImg>
            <Div3>입니다.</Div3>
            <br></br>
          </Div2>
        </Level>
        <Placer>
          <Div1>
            <br></br>"{this.nickname}" 님이 자주 찾는 장소는
          </Div1>
          <Div>
            {" "}
            "{this.best.city} {this.best.area}" 입니다.<br></br>
          </Div>
        </Placer>
        <Place>
          <PlaceGraph></PlaceGraph>
        </Place>
        <Category>
          <CategoryGraph></CategoryGraph>
        </Category>
      </Frame>
    );
  }
}
const Div1 = styled.div`
  justify-content: center;
  text-align: center;
  align-items: center;
`;
const Div2 = styled.div`
  justify-content: center;
  text-align: center;
  align-items: center;
  display: grid;
  grid-template-areas: "Piggy PiggyImg Div3";
  grid-template-columns: 2fr 1fr 1fr;
`;
const Div3 = styled.div`
  justify-content: center;
  text-align: center;
  align-items: center;
`;
const PiggyImg = styled.img`
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 2rem;
  height: 2rem;
  float: left;
  padding-left: 0.3rem;
`;
const LFrame = styled.div`
  height: 4rem;
  width: 100%;
`;
const Frame = styled.div`
  margin: 1rem;
  overflow: hidden;
`;
const Level = styled.div`
  background-color: #f28379;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  color: white;
  height: 100px;
  display: grid;
  grid-template-areas: "Div1" "Div2";
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
const Placer = styled.div`
  height: 100px;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: #5897a6;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  color: white;
  display: grid;
  grid-template-areas: "Div1" "Div";
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
const Place = styled.div`
  height: 220px;
  background-color: #f2e9e4;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  position: relative;
  z-index: -3;
`;
const Category = styled.div`
  height: 220px;
  background-color: #f2e9e4;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  position: relative;
  z-index: -3;
`;
const Div = styled.div`
  padding-bottom: 1rem;
`;
const Piggy = styled.div`
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  float: right;
`;

export default Statistic;
