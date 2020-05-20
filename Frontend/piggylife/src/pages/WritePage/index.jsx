import React from "react";
import styled from "styled-components";
import WriteContent from "../../components/WriteContent"

class WritePage extends React.Component{
    render(){
        return(
            <Frame>
                <WriteContent></WriteContent>
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


const Navbar = styled.div`
    grid-area: "navbar";
`

export default WritePage;