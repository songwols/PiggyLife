import React from "react";
import styled from "styled-components";
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
      num: 0,
      best: {
        area: "",
        city: "",
        cnt: "",
      },
    };
  }
  componentWillMount() {
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
    this.area = this.props.statisticStore.areaList;
    this.category = this.props.statisticStore.categoryList;
    this.ranking = this.props.userStore.ranking;
    this.rname = this.props.userStore.rname;
    this.num = this.props.storeStore.postslength;
    this.best = this.props.statisticStore.bestarea;
    console.log(this.category);
    return (
      <Frame>
        <LevelGraph>레벨그래프</LevelGraph>
        <Level>
          <Div>당신의 돼지력은</Div>
          <Piggy>
            Lv.{this.ranking} {this.rname}
          </Piggy>
          <Div>입니다</Div>
        </Level>
        <Placer>
          <Div>당신은</Div>
          <Piggy>
            {" "}
            "{this.best.city} {this.best.area}" 를
          </Piggy>
          <Div>자주 방문하는 돼지입니다</Div>
        </Placer>
        <Place>장소통계</Place>
        <Category>카테고리통계</Category>
      </Frame>
    );
  }
}

const Frame = styled.div`
  margin: 1rem;
  overflow: hidden;
`;
const LevelGraph = styled.div`
  justify-content: center;
  text-align: center;
  align-items: center;

  background-color: #f2e9e4;
  height: 3rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;
const Level = styled.div`
  border-radius: 0.5rem;
  background-color: #f28379;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  color: white;
  height: 100px;
`;
const Placer = styled.div`
  height: 100px;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: #5897a6;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  border-radius: 0.5rem;
  color: white;
`;
const Place = styled.div`
  height: 100px;
  background-color: #f2e9e4;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;
const Category = styled.div`
  height: 100px;
  background-color: #f2e9e4;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;
const Div = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Piggy = styled.div`
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default Statistic;
