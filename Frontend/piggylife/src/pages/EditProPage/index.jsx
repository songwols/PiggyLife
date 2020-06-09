import React from "react";
import styled from "styled-components";
import EditPro from "../../components/EditPro";
import Navbar from "../../components/Navbar";

class EditProPage extends React.Component{
    render(){
        return(
            <Frame>
                <EditPro></EditPro>
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

export default EditProPage;