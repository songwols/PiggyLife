import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class More extends React.Component{
    render(){
        return(
            <Frame>
                <BF><Link to={"/editP"} style={{ textDecoration: "none" }}><Button>프로필 수정</Button></Link></BF>
                <Space></Space>
                <BF><Link to={"/"} style={{ textDecoration: "none" }}><Button>로그아웃</Button></Link></BF>
                <Space></Space>
                <BF><Button>고객센터</Button></BF>
            </Frame>
        )
    }
}

const Space = styled.div`
    height: 2rem;
`

const Frame = styled.div`
    grid-area: "content";
    // height: 100%;
    padding: 10%;
    margin-top: 45%;
    // display: flex; 
    // align-items: center; 
    // justify-content: center; 
`

const BF = styled.div`
    text-align: center;
    width: 95%;
`

const Button = styled.button`
    margin-top: .3rem;
    width: 80%;
    height: 2rem;
    color: white;
    background: none;
    border: none;
    outline: none;
    border-radius: 0.3rem;
    background-color: #5897A6;
`

export default More;