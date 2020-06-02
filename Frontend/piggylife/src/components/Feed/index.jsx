import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Card from "./Card";

@inject("storeStore")
@observer
class FeedCompo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      length: 0,
    };
  }
  state = {
    count: 1,
  };

  componentWillMount() {
    this.props.storeStore.get_post(window.sessionStorage.getItem("uid"));
  }

  render() {
    this.list = this.props.storeStore.posts;
    this.length = this.props.storeStore.postslength;
    return (
      <div>
        {this.length === 0 ? (
          <NFrame>
            <Div>등록된 게시글이 없습니다.</Div>
          </NFrame>
        ) : (
          <Frame>
            {this.list.map((item, index) => (
              <Card key={index} store={item} />
            ))}
          </Frame>
        )}
      </div>
    );
  }
}

const NFrame = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  margin-top: 3rem;
`;

const Frame = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, 33.2%);
  grid-template-rows: repeat(auto-fit, 1fr);
`;
export default FeedCompo;
