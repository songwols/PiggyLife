import React from "react";
import styled from "styled-components";
import { Email } from "@styled-icons/material-outlined/Email";
import { PersonOutline } from "@styled-icons/evaicons-outline/PersonOutline";
import { Link } from "react-router-dom";
import { DotsVerticalRounded } from "@styled-icons/boxicons-regular/DotsVerticalRounded";

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

class Profile extends React.Component {
  render() {
    return (
      <Frame>
        <Div>
          <ProfileImage src="https://image.flaticon.com/icons/svg/747/747376.svg"></ProfileImage>
          <Info>
            <Nickname>
              <PersonIcon></PersonIcon>
              Nickname
            </Nickname>
            <Emaildiv>
              <EmailIcon></EmailIcon>
              ssafy@ssafy.com
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
  margin-left: 3rem;
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
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 50%;
  border-color: gray;
  border-style: solid;
`;

export default Profile;
