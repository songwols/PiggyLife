import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import 기사돼지 from "../Statistic/기사돼지.png";
import 남작돼지 from "../Statistic/남작돼지.png";
import 로얄돼지 from "../Statistic/로얄돼지.png";
import 아기돼지 from "../Statistic/아기돼지.png";
import 어린돼지 from "../Statistic/어린돼지.png";
import 청년돼지 from "../Statistic/청년돼지.png";
import 평민돼지 from "../Statistic/평민돼지.png";

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
    await this.props.statisticStore.fgetCategoryStatisticByEmail(
      this.props.email
    );
    this.setState({
      Name: this.props.userStore.fnickname,
      Image: this.props.userStore.fimage,
      Level: this.props.userStore.franking,
      RName: this.props.userStore.frname,
      cate1: this.props.statisticStore.fcate1,
      cate2: this.props.statisticStore.fcate2,
      cate3: this.props.statisticStore.fcate3,
    });
  }

  render() {
    if (this.state.Level === 0) {
      this.img = 아기돼지;
    } else if (this.state.Level === 1) {
      this.img = 어린돼지;
    } else if (this.state.Level === 2) {
      this.img = 청년돼지;
    } else if (this.state.Level === 3) {
      this.img = 평민돼지;
    } else if (this.state.Level === 4) {
      this.img = 기사돼지;
    } else if (this.state.Level === 5) {
      this.img = 남작돼지;
    } else if (this.state.Level === 6) {
      //this.img = 자작돼지;
    } else if (this.state.Level === 7) {
      // this.img = 백작돼지;
    } else if (this.state.Level === 8) {
      //this.img = 후작돼지;
    } else if (this.state.Level === 9) {
      // this.img = 공작돼지;
    } else if (this.state.Level === 10) {
      this.img = 로얄돼지;
    }
    return (
      <Content>
        <div>{this.state.Name} 님</div>
        {this.state.Image === "" || this.state.Image === null ? (
          <Img src={this.img}></Img>
        ) : (
          <Img src={this.state.Image}></Img>
        )}

        <Level>
          lv.{this.state.Level} {this.state.RName}
        </Level>
        {this.state.cate1.category_group !== "" ? (
          <Type>{this.state.cate1.category_group}파</Type>
        ) : (
          <></>
        )}
        {this.state.cate2.category_group !== "" ? (
          <Type>{this.state.cate2.category_group}파</Type>
        ) : (
          <></>
        )}
        {this.state.cate3.category_group !== "" ? (
          <Type>{this.state.cate3.category_group}파</Type>
        ) : (
          <></>
        )}
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
