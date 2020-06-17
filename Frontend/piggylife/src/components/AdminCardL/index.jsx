import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Card from "./Card";

@inject("storeStore")
@observer
class CardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      length: 1,
    };
  }

  async UNSAFE_componentWillMount() {
    
  }

  render() {
    return (
      <OUT>
        {this.state.length !== 0 ? (
          <Frame>
            {/* {this.list.map((item, index) => (
              <Card key={index} store={item} keyword={this.props.keyword}/>
            ))} */}
            <Card></Card>
            <Card></Card>
          </Frame>
        ) : (
          <NFrame>
            <Text>등록된 게시글이 없습니다.</Text>
          </NFrame>
        )}
      </OUT>
    );
  }
}

const OUT = styled.div`
    margin-bottom: 2rem;
    height: 100%;
    overflow: auto;
`
const Text = styled.div`
  margin-top: 40px;
`;

const NFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Frame = styled.div`
//   width: 100%;
  display: grid;
  grid-template-rows: repeat(5, 5rem);
//   grid-template-columns: 100%;
  grid-row-gap: 3%;
  margin-left: 10%;
  margin-right: 10%;
  white-space: nowrap;
//   overflow-x: scroll;
//   overflow-y: hidden;
`;

export default CardLayout;
