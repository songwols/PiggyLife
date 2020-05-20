import React from "react";
import styled from "styled-components";

class Confirm extends React.Component{
    render(){
        return(
            <EConfirm placeholder="인증코드 입력해주세요"></EConfirm>
        )
    }
}

const EConfirm = styled.input`
    font-size: 1.0rem;
    margin-top: .3rem;
    width: 95%;
    padding-left: .3rem;
    background: none;
    border-color: gray;
    border-style: solid;
    border-radius: 0.3rem;
    outline: none;
    box-shadow: none;
    border-width: 0.05rem;
    height: 2rem;
`

export default Confirm;