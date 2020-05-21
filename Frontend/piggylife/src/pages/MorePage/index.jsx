import React from "react";
import styled from "styled-components";
import More from "../../components/More";
import Navbar from "../../components/Navbar";

class MorePage extends React.Component{
    render(){
        return(
            <Frame>
                <More></More>
                <Navbar></Navbar>
            </Frame>
        )
    }
}

const Frame = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: auto 8vh;
    grid-template-areas: "content" "navbar";
`

export default MorePage;