import React from "react"
import Navbar from "../../components/Navbar"
import UserInfo from "../../components/MatchingContent/userInfo"
import styled from "styled-components";
import icon from "./clipboard.png";

class MatchingResultPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Frame>
                <Content>
                    <TopText>이인경 님과 박유진 님의 먹궁합 결과는</TopText>
                    <Info>
                        
                        <UserInfo></UserInfo>
                        
                        
                        <Score>
                            <Icon src={icon}></Icon>
                            <div>70%</div>
                        </Score>
                        
                        
                        <UserInfo></UserInfo>
                        
                    </Info>
                    <BothMukSpotlist>
                        <Title>두분을 위한 MukSpot은 여기!</Title>
                        {/* {returns ? (
                        returns.map((item, index) => <Card key={index} store={item} />)
                        ) : (
                        <></>
                        )} */}
                    </BothMukSpotlist>
                    <NewMukSpotlist>
                        <Title>새로운 곳은 어떤가요?</Title>
                        {/* {returns ? (
                        returns.map((item, index) => <Card key={index} store={item} />)
                        ) : (
                        <></>
                        )} */}
                    </NewMukSpotlist>
                </Content>

                <Navbar></Navbar>
            </Frame>
        );
    }

}
const Frame = styled.div`
  height: 100vh;
  
  
  
`;
const Content = styled.div`
    display: grid;
    height: 92vh;
    grid-template-areas: "TopText" "Info" "BothMukSpotlist" "NewMukSpotlist"  ;
    margin-left: 1rem;
    margin-top: 1rem;
`;
const Info = styled.div`
//   height: 100vh;
//   width:33%;
margin-right:15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "UserInfo Score UserInfo";
  
`;
const Score = styled.span`
//   height: 100vh;
margin-top:25px;
  text-align:center;
  
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
`;
const Title = styled.div``;
const BothMukSpotlist = styled.div``;
const NewMukSpotlist = styled.div``;


export default MatchingResultPage;