import React from "react";
import styled from "styled-components";
import Detail from "../../components/Detail";
import Navbar from "../../components/Navbar";

class DetailPage extends React.Component{
    render(){
        return(
            <Frame>
                <Detail></Detail>
                <Navbar></Navbar>
            </Frame>
        )
    }
}

const Frame = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: auto 8vh;
    grid-template-areas: "content" "navbar";
`

export default DetailPage;