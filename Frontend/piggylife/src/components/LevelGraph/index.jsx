import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("colorStore")
@observer
class LevelGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: 0,
      startnum: 0,
      mylength: 0,
      remainnum: 0,
      goalnum: 0,
    };
  }
  render() {
    console.log(this.props.todo);
    console.log(this.props.done);
    return (
      <Frame>
        <Level>
          <NowLevel>Lv. {this.props.ranking}</NowLevel>
          <NextLevel>Lv. {this.props.ranking + 1}</NextLevel>
        </Level>
        <Graph>
          <Done style={{ width: this.props.done }}></Done>
          <Todo style={{ width: this.props.todo }}></Todo>
        </Graph>
      </Frame>
    );
  }
}
const Level = styled.div`
  width: 21.5rem;
  height: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "NowLevel NextLevel";
`;
const Graph = styled.div`
  height: 2rem;
  display: flex;
`;
const NowLevel = styled.div`
  height: 1rem;
  float: left;
`;
const NextLevel = styled.div`
  height: 1rem;
  float: right;
  text-align: right;
`;
const Done = styled.div`
  height: 2rem;
  /* position: relative; */
  /* z-index: -1; */
  background-color: #f25e3d;
`;
const Todo = styled.div`
  /* display: inline; */
  height: 2rem;
  /* position: relative; */
  /* z-index: 10; */
  background-color: #f2e9e4;
  float: left;
`;
const Frame = styled.div`
  /* position: relative; */
  z-index: 1;
  justify-content: center;
  /* text-align: center; */
  align-items: center;
  width: 21.5rem;
  background-color: ${(props) => props.done};
  height: 4rem;
  /* margin-top: 0.3rem; */
  /* margin-bottom: 0.3rem; */
  display: grid;
  grid-template-rows: 1fr 1.5fr;
  grid-template-areas: "Level" "Graph";
  overflow: hidden;
`;

export default LevelGraph;
