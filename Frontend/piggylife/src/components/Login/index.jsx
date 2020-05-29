import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("userStore")
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  Login = (e) => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.userStore.login(user);
    //alert(this.state.username + "님! 반갑습니다!");
  };
  render() {
    return (
      <Frame>
        <InputFrame>
          <InputBox>
            <ID
              placeholder="EMAIL"
              onChange={this.onEmailChange}
              name="email"
              value={this.state.email}
            ></ID>
            <PW
              placeholder="PASSWORD"
              type="password"
              onChange={this.onPasswordChange}
              name="password"
              value={this.state.password}
            ></PW>
          </InputBox>
          <ButtonBox>
            <Button onClick={this.Login}>LOGIN</Button>
          </ButtonBox>
        </InputFrame>
        <LinkFrame>
          <L1>
            <Link to={"/Join"} style={{ textDecoration: "none" }}>
              회원가입
            </Link>
          </L1>
          <L2>
            <Link to={"/findpw"} style={{ textDecoration: "none" }}>
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const L1 = styled.div`
  margin-right: 0.3rem;
`;

const L2 = styled.div`
  margin-left: 0.3rem;
`;

export default Login;
