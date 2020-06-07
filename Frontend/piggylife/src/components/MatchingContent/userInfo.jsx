import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

@inject("userStore")
@observer
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Image: "",
      Level: "",
      RName: "",
    };
  }

  async componentWillMount() {
    await this.props.userStore.whoami(this.props.id);
    this.setState({
      Name: this.props.userStore.nickname,
      Image: this.props.userStore.image,
      Level: this.props.userStore.ranking,
      RName: this.props.userStore.rname,
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
        <Type>일식파</Type>
        <Type>한식파</Type>
        <Type>디저트파</Type>
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

export default UserInfo;
