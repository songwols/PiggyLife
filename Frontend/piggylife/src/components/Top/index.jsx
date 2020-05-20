import React from "react";
import styled from "styled-components";
import back from './back.png'
import logo from './logo.png'
import { Link } from 'react-router-dom';

class Top extends React.Component{
    render(){
        return(
            <Frame>
                <Back><Link to={"/"} style={{ textDecoration: "none" }}><Img1 src={back}></Img1></Link></Back>
                <Icon><Img2 src={logo}></Img2></Icon>
            </Frame>
        )
    }
}

const Frame = styled.div`
    grid-area: "top";
    height: 100%;
`

const Back = styled.div`
    float: left;
    vertical-align: middle;
    display: inline-block;
    margin-top: 25px;
    margin-left: 15px;
`

const Icon = styled.div`
    float: right;
    margin-top: 10px;
    margin-right: 15px;
`

const Img1 = styled.img`
    display: flex;
    justify-content: center;
    text-align: center;
    height: 25px;
    object-fit: cover;
    margin: auto;
`

const Img2 = styled.img`
    display: flex;
    justify-content: center;
    text-align: center;
    height: 60px;
    object-fit: cover;
    margin: auto;
`

export default Top;