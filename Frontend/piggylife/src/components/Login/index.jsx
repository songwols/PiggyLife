import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <Frame>
        <InputFrame>
          <InputBox>
            <ID placeholder="EMAIL"></ID>
            <PW placeholder="PASSWORD"></PW>
          </InputBox>
          <ButtonBox>
            <Link to={"/Home"} style={{ textDecoration: "none" }}>
              <Button>LOGIN</Button>
            </Link>
          </ButtonBox>
        </InputFrame>
        <LinkFrame>
          <L1>
            <Link to={"/Join"} style={{ textDecoration: "none" }}>
              회원가입
            </Link>
          </L1>
          <L2>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              비번찾기
            </Link>
          </L2>
        </LinkFrame>
      </Frame>
    );
  }
}

const Frame = styled.div`
  grid-area: "inputF";
  padding-left: 5%;
  padding-right: 5%;
  display: grid;
  grid-template-rows: 80% 20%;
  grid-template-areas: "inputframe" "linkframe";
`;

const InputFrame = styled.div`
  grid-area: "inputframe";
  height: 100%;
  display: grid;
  grid-template-columns: 73% 27%;
  grid-template-areas: "inputbox buttonbox";
`;

const InputBox = styled.div`
  grid-area: "inputbox";
  // height: 100%;
  padding-top: 15%;
  padding-bottom: 15%;
  padding-left: 5%;
`;

const ID = styled.input`
  font-size: 1rem;
  width: 90%;
  padding-left: 0.3rem;
  background: none;
  border-color: gray;
  border-style: solid;
  border-radius: 0.3rem;
  border-width: 0.05rem;
  height: 2rem;
  outline: none;
  box-shadow: none;
`;

const PW = styled.input`
  margin-top: 0.3rem;
  font-size: 1rem;
  width: 90%;
  padding-left: 0.3rem;
  background: none;
  border-color: gray;
  border-style: solid;
  border-radius: 0.3rem;
  border-width: 0.05rem;
  height: 2rem;
  outline: none;
  box-shadow: none;
`;

const ButtonBox = styled.div`
  grid-area: "buttonbox";
  justify-items: center;
  text-align: center;
  padding: 30% 10% 30% 10%;
`;

const Button = styled.button`
  height: 100%;
  width: 100%;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  background-color: #5897a6;
`;

const LinkFrame = styled.div`
  grid-area: "linkframe";
  padding-left: 25%;
  padding-right: 25%;
`;

const L1 = styled.div`
  float: left;
`;

const L2 = styled.div`
  float: right;
`;

export default Login;
