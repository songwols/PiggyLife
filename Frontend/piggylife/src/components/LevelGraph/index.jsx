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
  width: 91vw;
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
  background-color: #f25e3d;
`;
const Todo = styled.div`
  height: 2rem;
  background-color: #f2e9e4;
  float: left;
`;
const Frame = styled.div`
  z-index: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.done};
  height: 4rem;
  display: grid;
  grid-template-rows: 1fr 1.5fr;
  grid-template-areas: "Level" "Graph";
  overflow: hidden;
`;

export default LevelGraph;
