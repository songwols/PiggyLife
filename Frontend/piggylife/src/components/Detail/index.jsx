import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Map from "../DMap";

@inject("storeStore")
@observer
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store_name: "",
      address: "",
      img: "",
      category: "",
      tel: "",
      menu: "등록된 메뉴가 없습니다.",
      visited: false,
      isLike: 0,
    };
  }

  async componentWillMount() {
    window.scrollTo(0, 0);
    await this.props.storeStore.detail(this.props.id);
    const post = this.props.storeStore.detailPost;
    this.setState({
      store_name: post.name,
      address: post.address,
      img: "",
      category: post.category,
      tel: post.tel,
      menu: post.menues,
      visited: false,
      isLike: 0,
    });
    if (post.menues.length === 0) {
      this.setState({
        menu: "등록된 메뉴가 없습니다.",
      });
    }
  }

  render() {
    return (
      <Frame>
        <Pic>
          {this.state.img === "" || this.state.img === null ? (
            <Text>등록된 이미지가 없습니다.</Text>
          ) : (
            <Simg src={this.state.img}></Simg>
          )}
        </Pic>
        <Info>
          <Text>{this.state.store_name}</Text>
          <Text>{this.state.address}</Text>
          <Text>{this.state.tel}</Text>
        </Info>
        <Menu>
          <Text>메뉴</Text>
          {this.state.menu === "등록된 메뉴가 없습니다." ? (
            <Context>{this.state.menu}</Context>
          ) : (
            <div>
              {this.state.menu.map((item, index) => (
                <Context key={index}>
                  {" "}
                  {item.menuName} - {item.price}
                </Context>
              ))}
            </div>
          )}
        </Menu>
        <Map id={this.props.id} keyword="detail"></Map>
        <Tag>태그</Tag>
        <Context />
      </Frame>
    );
  }
}
const Simg = styled.img`
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Frame = styled.div`
  height: 100%;
  display: grid;
  padding: 0 15px 0 15px;
  grid-template-rows: repeat(6, auto);
  grid-template-areas: "pic" "info" "menu" "map" "tag" "memo";
`;
const Pic = styled.div`
  grid-area: "pic";
  margin-top: 0.5rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #cccccc;
  border-radius: 0.5rem;
`;

const Info = styled.div`
  grid-area: "info";
  margin-top: 0.5rem;
  background-color: #f2e9e4;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
`;

const Menu = styled.div`
  grid-area: "menu";
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #f2e9e4;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
`;

const Tag = styled.div`
  grid-area: "tag";
  margin-top: 0.5rem;
  height: 5rem;
  background-color: #f2e9e4;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
`;

const Text = styled.div`
  min-height: 2rem;
  font-size: larger;
`;

const Context = styled.div`
  height: 2rem;
`;

export default Detail;
