import React from "react";
import styled from "styled-components";
import Detail from "../../components/Detail";
import Navbar from "../../components/Navbar";
import Top from "../../components/Top"

const DetailPage = ({ match }) => {
    return(
        <Frame>
            <Top></Top>
            <Detail id={match.params.sid}></Detail>
            <Navbar></Navbar>
        </Frame>
    )
    
}

const Frame = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: auto auto 8vh;
    grid-template-areas: "top" "content" "navbar";
`

export default DetailPage;