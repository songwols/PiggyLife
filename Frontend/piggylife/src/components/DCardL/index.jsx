import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import DCard from "./DCard";

@inject("storeStore")
@observer
class DCardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      length: 0,
    };
  }

  UNSAFE_componentWillMount() {
    const keyword = this.props.keyword;
    if (keyword === "mypost") {
      this.props.storeStore.get_mypost(window.sessionStorage.getItem("uid"));
    }
  }

  render() {
    if (this.props.keyword === "mypost") {
      this.list = this.props.storeStore.myposts;
      this.length = this.props.storeStore.mypostslength;
    }

    return (
      <div>
        {this.length !== 0 ? (
          <Frame>
            {this.list.map((item, index) => (
              <DCard key={index} store={item} />
            ))}
          </Frame>
        ) : (
          <NFrame>
            <Text>등록된 게시글이 없습니다.</Text>
          </NFrame>
        )}
      </div>
    );
  }
}

const Text = styled.div`
  margin-top: 40px;
`;

const NFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Frame = styled.div`
  width: fit-content;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export default DCardLayout;
