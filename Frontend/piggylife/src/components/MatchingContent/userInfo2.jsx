import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("userStore", "statisticStore")
@observer
class UserInfo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Image: "",
      Level: "",
      RName: "",
      cate1: {
        category_group: "",
        count: 0,
      },
      cate2: {
        category_group: "",
        count: 0,
      },
      cate3: {
        category_group: "",
        count: 0,
      },
    };
  }

  async UNSAFE_componentWillMount() {
    await this.props.userStore.whoru(this.props.email);
    await this.props.statisticStore.getCategoryStatisticByEmail(
      this.props.email
    );
    this.setState({
      Name: this.props.userStore.fnickname,
      Image: this.props.userStore.fimage,
      Level: this.props.userStore.franking,
      RName: this.props.userStore.frname,
      cate1: this.props.statisticStore.cate1,
      cate2: this.props.statisticStore.cate2,
      cate3: this.props.statisticStore.cate3,
    });
  }

  render() {
    return (
      <Content>
        <div>{this.state.Name} 님</div>
        {this.state.Image === "" ? (
          <Img src="https://image.flaticon.com/icons/svg/747/747376.svg"></Img>
        ) : (
          <Img src={this.state.Image}></Img>
        )}

        <Level>
          lv.{this.state.Level} {this.state.RName}
        </Level>
        <Type>{this.state.cate1.category_group}파</Type>
        <Type>{this.state.cate2.category_group}파</Type>
        <Type>{this.state.cate3.category_group}파</Type>
      </Content>
    );
  }
}
const Content = styled.span`
  height: 100%;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: inline-block;
`;
const Img = styled.img`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 6.5rem;
  height: 6.5rem;
  object-fit: cover;
  border-radius: 50%;
  border-color: gray;
  border-style: solid;
`;
const Level = styled.div``;
const Type = styled.div``;

export default UserInfo2;
