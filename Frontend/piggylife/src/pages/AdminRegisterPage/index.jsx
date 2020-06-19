import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Top from "../../components/Top"
import AdminRegister from "../../components/AdminRegister"

const AdminRegisterPage  = ({ match }) => {
    return(
        <Frame>
        <Top></Top>
        <AdminRegister id={match.params.urid}></AdminRegister>
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

export default AdminRegisterPage;