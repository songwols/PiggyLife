import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("statisticStore", "userStore")
@observer
class CategoryGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      big: 0,
      size: "",
      cate1: {
        categoty_group: "",
        count: 0,
      },
      cate2: {
        categoty_group: "",
        count: 0,
      },
      cate3: {
        categoty_group: "",
        count: 0,
      },
      cate4: {
        categoty_group: "",
        count: 0,
      },
      cate5: {
        categoty_group: "",
        count: 0,
      },
    };
  }
  UNSAFE_componentWillMount() {
    this.props.userStore.whoami(window.sessionStorage.getItem("email"));
  }
  render() {
    this.cate1 = this.props.statisticStore.cate1;
    this.cate2 = this.props.statisticStore.cate2;
    this.cate3 = this.props.statisticStore.cate3;
    this.cate4 = this.props.statisticStore.cate4;
    this.cate5 = this.props.statisticStore.cate5;
    this.big = this.cate1.count;
    this.size = 145 / this.big;
    this.nickname = this.props.userStore.nickname;
    return (
      <Frame>
        <Title>"{this.nickname}" 님이 자주 찾는 카테고리 Top5</Title>
        <Graph>
          <Grid>
            <FirstGrid>
              <First
                style={{ height: this.size * this.cate1.count + "px" }}
              ></First>
            </FirstGrid>
            <SecondGrid>
              <Second
                style={{ height: this.size * this.cate2.count + "px" }}
              ></Second>
            </SecondGrid>
            <ThirdGrid>
              <Third
                style={{ height: this.size * this.cate3.count + "px" }}
              ></Third>
            </ThirdGrid>
            <FourthGrid>
              <Fourth
                style={{ height: this.size * this.cate4.count + "px" }}
              ></Fourth>
            </FourthGrid>
            <FifthGrid>
              <Fifth
                style={{ height: this.size * this.cate5.count + "px" }}
              ></Fifth>
            </FifthGrid>
          </Grid>
        </Graph>
        <Place>
          <FirstPlace>{this.cate1.category_group}</FirstPlace>
          <SecondPlace>{this.cate2.category_group}</SecondPlace>
          <ThirdPlace>{this.cate3.category_group}</ThirdPlace>
          <FourthPlace>{this.cate4.category_group}</FourthPlace>
          <FifthPlace>{this.cate5.category_group}</FifthPlace>
        </Place>
      </Frame>
    );
  }
}

const Title = styled.div`
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  margin-bottom: 1.5rem;
  float: left;
  height: 5px;
`;
const Place = styled.div`
  height: 20px;
  width: 81%;
  margin-left: 2.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "FirstPlace SecondPlace ThirdPlace FourthPlace Fifthlace";
`;
const FirstPlace = styled.div`
  font-size: 1rem;
  width: 100%;
  height: inherit;
`;
const SecondPlace = styled.div`
  font-size: 1rem;
  width: 100%;
  height: inherit;
`;
const ThirdPlace = styled.div`
  font-size: 1rem;
  width: 100%;
  height: inherit;
`;
const FourthPlace = styled.div`
  font-size: 1rem;
  width: 100%;
  height: inherit;
`;
const FifthPlace = styled.div`
  font-size: 1rem;
  width: 100%;
  height: inherit;
`;
const Frame = styled.div`
  height: inherit;
  width: inherit;
  /* padding-top: 1.5rem; */
  justify-content: center;
  text-align: center;
  align-items: center;
  display: block;
  position: relative;
  z-index: -2;
`;
const Graph = styled.div`
  height: 150px;
  width: 90%;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-style: solid;
  border-color: black;
  border-width: 0.1rem;
  border-top: hidden;
  border-right: hidden;
  display: flex;
  margin-left: 1.2rem;
`;
const Grid = styled.div`
  margin-top: 5.5px;
  height: 145px;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "FirstGrid SecondGrid ThirdGrid FourthGrid FifthGrid";
`;
const FirstGrid = styled.div`
  height: inherit;
  width: inherit;
  position: relative;
`;
const SecondGrid = styled.div`
  height: inherit;
  width: inherit;
  position: relative;
`;
const ThirdGrid = styled.div`
  height: inherit;
  width: inherit;
  position: relative;
`;
const FourthGrid = styled.div`
  height: inherit;
  width: inherit;
  position: relative;
`;
const FifthGrid = styled.div`
  height: inherit;
  width: inherit;
  position: relative;
`;
const First = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #2c4c54;
  position: absolute;
  bottom: 0px;
`;
const Second = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #467986;
  position: absolute;
  bottom: 0px;
`;
const Third = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #69a2b0;
  position: absolute;
  bottom: 0px;
`;
const Fourth = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #9bc1ca;
  position: absolute;
  bottom: 0px;
`;
const Fifth = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #cde0e5;
  position: absolute;
  bottom: 0px;
`;
export default CategoryGraph;
