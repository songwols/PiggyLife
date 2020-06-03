import React from "react";
import styled from "styled-components";
import EditContent from "../../components/EditContent"
import Navbar from "../../components/Navbar"
import Top from "../../components/Top"

const EditDetailPage = ({ match }) => {
    return(
            <Frame>
                <Top></Top>
                <EditContent id={match.params.pid}></EditContent>
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

export default EditDetailPage;