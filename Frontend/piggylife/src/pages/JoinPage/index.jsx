import React from "react";
import styled from "styled-components";
import Top from "../../components/Top"
import CJoin from "../../components/Join"

class Join extends React.Component{
    render(){
        return(
            <Frame>
                <Top></Top>
                <CJoin></CJoin>
            </Frame>
        )
    }
}

const Frame = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 80px;
    grid-template-areas: "top" "content";
`


export default Join;