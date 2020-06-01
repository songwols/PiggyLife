import React from "react";
import styled from "styled-components";
import Mydetail from "../../components/Mydetail";
import Navbar from "../../components/Navbar";

class MyDetailPage extends React.Component{
    render(){
        return(
            <Frame>
                <Mydetail></Mydetail>
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

export default MyDetailPage;