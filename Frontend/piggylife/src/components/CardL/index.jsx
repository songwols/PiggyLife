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
      length: 0,
    };
  }

  async UNSAFE_componentWillMount() {
    const keyword = this.props.keyword;
    if (keyword === "top10") {
      await this.props.storeStore.get_top10();
    } else if (keyword === "hotplace") {
      await this.props.storeStore.get_hotplace(window.sessionStorage.getItem("uid"));
    } else if (keyword === "similar") {
      await this.props.storeStore.get_similar(window.sessionStorage.getItem("uid"));
    }else if (keyword === "recommendfor2") {
      await this.props.storeStore.get_for2(window.sessionStorage.getItem("email"), this.props.fid);
    }else if (keyword === "new_place") {
      // this.props.storeStore.get_newplace(window.sessionStorage.getItem("email"), this.props.fid);
    }
  }

  render() {
    if (this.props.keyword === "hotplace") {
      this.list = this.props.storeStore.hotplace;
      this.length = this.props.storeStore.hotplacelength;
    } else if (this.props.keyword === "top10") {
      this.list = this.props.storeStore.top10;
      this.length = this.props.storeStore.top10length;
    } else if (this.props.keyword === "similar") {
      this.list = this.props.storeStore.similar;
      this.length = this.props.storeStore.similarlength;
    } else if (this.props.keyword === "recommendfor2") {
      this.list = this.props.storeStore.for2;
      this.length = this.props.storeStore.for2length;
    } else if (this.props.keyword === "new_place") {
      this.list = this.props.storeStore.newplace;
      this.length = this.props.storeStore.newplacelength;
    }
    return (
      <div>
        {this.length !== 0 ? (
          <Frame>
            {this.list.map((item, index) => (
              <Card key={index} store={item} keyword={this.props.keyword}/>
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
  /* grid-area: List; */
  /* grid-column-gap: 3%;
  grid-template-columns: repeat(auto-fit, 29%); */
  display: flex;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export default CardLayout;
