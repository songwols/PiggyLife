import React from "react";
import styled from "styled-components";
import icon from "./clipboard.png";
import { inject, observer } from "mobx-react";
import UserInfo from "../../components/MatchingContent/userInfo";

@inject("userStore")
@observer
class MatchingResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myName: "",
            fName: "",
        };
      }

    async componentWillMount(){
        await this.props.userStore.whoami(sessionStorage.getItem("email"));
        this.setState({
            myName: this.props.userStore.nickname,
            myLevel: this.props.userStore.ranking,
        })
        await this.props.userStore.whoami(this.props.id);
        this.setState({
            myName: this.state.myName,
            fName: this.props.userStore.nickname,
        })
    }
    render(){
        return(
            <Content>
                <TopText>{this.state.myName} 님과 {this.state.fName} 님의 먹궁합 결과는</TopText>
                <Info>
                    <UserInfo id={sessionStorage.getItem("email")}></UserInfo>
                    <Score>
                    <Icon src={icon}></Icon>
                    <div>70%</div>
                    </Score>
                    <UserInfo id={this.props.id}></UserInfo>
                </Info>
                <Blank></Blank>
                <BothMukSpotlist>
                    <Title>두분을 위한 MukSpot은 여기!</Title>
                    <Cards></Cards>
                </BothMukSpotlist>
                <Blank></Blank>
                <NewMukSpotlist>
                    <Title>새로운 곳은 어떤가요?</Title>
                    <Cards></Cards>
                </NewMukSpotlist>
        </Content>
        )
    }
}

const Content = styled.div`
  display: grid;
  height: 86vh;
  width: 100%;
  grid-template-areas: "TopText" "Info" "Blank" "BothMukSpotlist" "Blank" "NewMukSpotlist";
  grid-template-rows: 0.5fr 3fr 0.3fr 2fr 0.3fr 2fr;
  margin-top: 1rem;
`;
const Info = styled.div`
  height: auto;
  display: grid;
  grid-template-areas: "UserInfo Score UserInfo";
  grid-template-columns: 2fr 1fr 2fr;
`;
const Score = styled.span`
  margin-top: 25px;
  text-align: center;
`;
const Icon = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 50px;
  object-fit: cover;
  margin: auto;
`;
const TopText = styled.div`
  align-self: center;
  margin-left: 1rem;
`;
const Title = styled.div`
  margin-left: 1rem;
`;
const BothMukSpotlist = styled.div``;
const NewMukSpotlist = styled.div``;
const Cards = styled.div`
  background-color: #ffe8bd;
  height: 90%;
`;
const Blank = styled.div``;

export default MatchingResult;