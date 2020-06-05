import React from "react";
import styled from "styled-components";
import More from "../../components/More";
import Navbar from "../../components/Navbar";
import Top from "../../components/Top"


class MorePage extends React.Component{
    render(){
        return(
            <Frame>
                <Top></Top>
                <More></More>
                <Navbar></Navbar>
            </Frame>
        )
    }
}

const Frame = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 15vh auto 8vh;
    grid-template-areas: "top" "content" "navbar";
`

export default MorePage;