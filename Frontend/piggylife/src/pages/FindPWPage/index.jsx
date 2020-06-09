import React from "react";
import styled from "styled-components";
import Top from "../../components/Top"
import PW from "../../components/PW"

class FindPWPage extends React.Component{
    render(){
        return(
            <Frame>
                <Top></Top>
                <PW></PW>
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


export default FindPWPage;