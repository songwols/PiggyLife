import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class Statistic extends React.Component {
  render() {
    return (
      <Frame>
        <LevelGraph>레벨그래프? 들어갈자리</LevelGraph>
        <Level>
          <Div>당신의 돼지력은</Div>
          <Piggy>걷기 시작한 아기돼지</Piggy>
          <Div>입니다</Div>
        </Level>
        <Placer>
          <Div>당신은</Div>
          <Piggy> 동탄 스타벅스 카페순이</Piggy>
          <Div>입니다</Div>
        </Placer>
        <Place>장소 통계 들어갈 자리</Place>
        <Category>카테고리 통계 들어갈 자리</Category>
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
