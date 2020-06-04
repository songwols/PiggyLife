import React from "react";
import styled from "styled-components";
import Mydetail from "../../components/Mydetail";
import Navbar from "../../components/Navbar";
import Top from "../../components/Top"

const MyDetailPage = ({ match }) => {
    return(
        <Frame>
            <Top></Top>
            <Mydetail id={match.params.pid}></Mydetail>
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

export default MyDetailPage;