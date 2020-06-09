import React from "react";
import styled from "styled-components";
import back from './back.png'
import logo from './logo.png'
import { withRouter } from "react-router-dom";

@withRouter
class Top extends React.Component{
    async UNSAFE_componentWillMount() {
        window.scrollTo(0, 0);
    }
    
    render(){
        const goBack = (e) => {
            e.preventDefault();
            this.props.history.go(-1);
          };

        return(
            <Frame>
                <Back><Bc onClick={goBack}><Img1 src={back}></Img1></Bc></Back>
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

const Bc = styled.button`
    background: none;
    height: 100%;
    border: none;
    outline: none;
    cursor: pointer;
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