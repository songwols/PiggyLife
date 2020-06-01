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
  componentWillMount() {
    const keyword = this.props.keyword;
    if (keyword === "top10") {
      this.props.storeStore.get_top10();
      this.setState({
        list: this.props.storeStore.top10,
        length: this.props.storeStore.top10length,
      });
    } else if (keyword === "mypost") {
      this.props.storeStore.get_mypost();
      this.setState({
        list: this.props.storeStore.mypost,
        length: this.props.storeStore.mypostslength,
      });
    } else if (keyword === "hotplace") {
      this.props.storeStore.get_hotplace();
      this.setState({
        list: this.props.storeStore.hotplace,
        length: this.props.storeStore.hotplacelength,
      });
    } else if (keyword === "similar") {
      this.props.storeStore.get_similar();
      this.setState({
        list: this.props.storeStore.similar,
        length: this.props.storeStore.similarlength,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.length !== 0 ? (
          <Frame>
            {this.state.list.map((item, index) => (
              <Card key={index} store={item} />
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
  padding-left: 5%;
  padding-right: 5%;
  grid-area: List;
  display: grid;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: repeat(auto-fit, 29%);
  grid-template-rows: repeat(auto-fit, 1fr);
`;

export default CardLayout;
