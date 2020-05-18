import React from "react";
import title from './title.png'
import styled from "styled-components";
import Login from "../../components/Login";

class Mainpage extends React.Component{
    render(){
        return(
            <Frame>
                <div></div>
                <Title><Out><Img src={title}></Img></Out></Title>
                <Login></Login>
            </Frame>
        )
    }
}

const Frame = styled.div`
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-rows: 15% 35% 25% 25%;
    grid-template-areas: "." "title" "inputF" ".";
`

const Title = styled.div`
    grid-area: "title";
`

const Out = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    height: 100%;
    object-fit: cover;
    margin: auto;
`
const Img = styled.img`
    display: flex;
    justify-content: center;
    text-align: center;
    height: 170px;
    object-fit: cover;
    margin: auto;
`


export default Mainpage;