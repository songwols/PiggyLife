import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("statisticStore", "userStore")
@observer
class PlaceGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      big: 0,
      size: "",
      area1: {
        area: "",
        city: "",
        cnt: 0,
      },
      area2: {
        area: "",
        city: "",
        cnt: 0,
      },
      area3: { area: "", city: "", cnt: 0 },
      area4: { area: "", city: "", cnt: 0 },
      area5: { area: "", city: "", cnt: 0 },
    };
  }
  UNSAFE_componentWillMount() {
    this.props.userStore.whoami(window.sessionStorage.getItem("email"));
  }
  render() {
    this.area1 = this.props.statisticStore.area1;
    this.area2 = this.props.statisticStore.area2;
    this.area3 = this.props.statisticStore.area3;
    this.area4 = this.props.statisticStore.area4;
    this.area5 = this.props.statisticStore.area5;
    this.big = this.area1.cnt;
    this.size = 145 / this.big;
    this.nickname = this.props.userStore.nickname;
    return (
      <Frame>
        <Title>"{this.nickname}" 님이 자주 찾는 장소 Top5</Title>
        <Graph>
          <Grid>
            <FirstGrid>
              <First
                style={{ height: this.size * this.area1.cnt + "px" }}
              ></First>
            </FirstGrid>
            <SecondGrid>
              <Second
                style={{ height: this.size * this.area2.cnt + "px" }}
              ></Second>
            </SecondGrid>
            <ThirdGrid>
              <Third
                style={{ height: this.size * this.area3.cnt + "px" }}
              ></Third>
            </ThirdGrid>
            <FourthGrid>
              <Fourth
                style={{ height: this.size * this.area4.cnt + "px" }}
              ></Fourth>
            </FourthGrid>
            <FifthGrid>
              <Fifth
                style={{ height: this.size * this.area5.cnt + "px" }}
              ></Fifth>
            </FifthGrid>
          </Grid>
        </Graph>
        <Place>
          <FirstPlace>
            {this.area1.city}
            <br></br>
            {this.area1.area}
          </FirstPlace>
          <SecondPlace>
            {this.area2.city}
            <br></br>
            {this.area2.area}
          </SecondPlace>
          <ThirdPlace>
            {this.area3.city}
            <br></br>
            {this.area3.area}
          </ThirdPlace>
          <FourthPlace>
            {this.area4.city}
            <br></br>
            {this.area4.area}
          </FourthPlace>
          <FifthPlace>
            {this.area5.city}
            <br></br>
            {this.area5.area}
          </FifthPlace>
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
  font-size: 0.7rem;
  width: 100%;
  height: inherit;
`;
const SecondPlace = styled.div`
  font-size: 0.7rem;
  width: 100%;
  height: inherit;
`;
const ThirdPlace = styled.div`
  font-size: 0.7rem;
  width: 100%;
  height: inherit;
`;
const FourthPlace = styled.div`
  font-size: 0.7rem;
  width: 100%;
  height: inherit;
`;
const FifthPlace = styled.div`
  font-size: 0.7rem;
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
  background-color: #ea3e2e;
  position: absolute;
  bottom: 0px;
`;
const Second = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #ef695d;
  position: absolute;
  bottom: 0px;
`;
const Third = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #f28379;
  position: absolute;
  bottom: 0px;
`;
const Fourth = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #f6a9a2;
  position: absolute;
  bottom: 0px;
`;
const Fifth = styled.div`
  margin-left: 0.75rem;
  width: 2rem;
  background-color: #fad4d1;
  position: absolute;
  bottom: 0px;
`;
export default PlaceGraph;
