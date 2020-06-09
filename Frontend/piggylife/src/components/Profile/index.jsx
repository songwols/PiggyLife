import React from "react";
import styled from "styled-components";
import { Email } from "@styled-icons/material-outlined/Email";
import { PersonOutline } from "@styled-icons/evaicons-outline/PersonOutline";
import { Link } from "react-router-dom";
import { DotsVerticalRounded } from "@styled-icons/boxicons-regular/DotsVerticalRounded";
import { inject, observer } from "mobx-react";
import 기사돼지 from "../Statistic/기사돼지.png";
import 남작돼지 from "../Statistic/남작돼지.png";
import 로얄돼지 from "../Statistic/로얄돼지.png";
import 아기돼지 from "../Statistic/아기돼지.png";
import 어린돼지 from "../Statistic/어린돼지.png";
import 청년돼지 from "../Statistic/청년돼지.png";
import 평민돼지 from "../Statistic/평민돼지.png";

export const More = styled(DotsVerticalRounded)`
  width: 2rem;
  height: 2rem;
  float: right;
  margin: 0.5rem;
  color: black;
`;

export const EmailIcon = styled(Email)`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
`;

export const PersonIcon = styled(PersonOutline)`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
`;
@inject("userStore")
@observer
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      defaultimg: "",
      ranking: 0,
    };
  }

  async UNSAFE_componentWillMount() {
    const email = sessionStorage.getItem("email");
    await this.props.userStore.whoami(email);

    const img = this.props.userStore.image;
    this.setState({
      image: img,
    });

    if (this.props.ranking === 0) {
      this.setState({
        defaultimg: 아기돼지,
      });
    } else if (this.props.ranking === 1) {
      this.setState({
        defaultimg: 어린돼지,
      });
    } else if (this.props.ranking === 2) {
      this.setState({
        defaultimg: 청년돼지,
      });
    } else if (this.props.ranking === 3) {
      this.setState({
        defaultimg: 평민돼지,
      });
    } else if (this.props.ranking === 4) {
      this.setState({
        defaultimg: 기사돼지,
      });
    } else if (this.props.ranking === 5) {
      this.setState({
        defaultimg: 남작돼지,
      });
    } else if (this.props.ranking === 6) {
      //this.defaultimg = 자작돼지;
    } else if (this.props.ranking === 7) {
      // this.defaultimg = 백작돼지;
    } else if (this.props.ranking === 8) {
      //this.defaultimg = 후작돼지;
    } else if (this.props.ranking === 9) {
      // this.defaultimg = 공작돼지;
    } else if (this.props.ranking === 10) {
      this.setState({
        defaultimg: 로얄돼지,
      });
    }
  }

  render() {
    return (
      <Frame>
        <Div>
          {this.state.image !== "" &&
          this.state.image !== "null" &&
          this.state.image !== null ? (
            <ProfileImage src={this.props.userStore.image}></ProfileImage>
          ) : (
            <ProfileImage src={this.state.defaultimg}></ProfileImage>
          )}
          <Info>
            <Nickname>
              <PersonIcon></PersonIcon>
              {this.props.userStore.nickname}
            </Nickname>
            <Emaildiv>
              <EmailIcon></EmailIcon>
              {this.props.userStore.email}
            </Emaildiv>
          </Info>
        </Div>
        <Link to={"/More"} style={{ textDecoration: "none" }}>
          <More></More>
        </Link>
      </Frame>
    );
  }
}

const Frame = styled.div`
  position: sticky;
  top: 0;
  height: 150px;
  display: grid;
  grid-template-columns: auto 0.5fr;
  grid-template-areas: "Div More";
`;
const Div = styled.div`
  position: sticky;
  top: 0;
  height: 150px;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: "ProfileImage Info";
  margin-left: 1.5rem;
`;

const Info = styled.div`
  margin-left: 0.5rem;
  align-items: center;
`;

const Nickname = styled.div``;

const Emaildiv = styled.div``;

const ProfileImage = styled.img`
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
  border: 1.5px solid #cccccc;
`;

export default Profile;
