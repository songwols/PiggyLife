import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Top from "../../components/Top"
import AdminCardL from "../../components/AdminCardL"

class AdminSearchPage extends React.Component{
    render(){
        return(
            <Frame>
            <Top></Top>
            <AdminCardL></AdminCardL>
            <Navbar></Navbar>
        </Frame>
        )
    }
}

const Frame = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: auto auto 8vh;
    grid-template-areas: "top" "content" "navbar";
`

export default AdminSearchPage;