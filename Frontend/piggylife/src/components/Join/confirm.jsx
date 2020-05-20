import React from "react";
import styled from "styled-components";

class Confirm extends React.Component{
    render(){
        return(
            <div>
            <EConfirm placeholder="인증코드 입력해주세요"></EConfirm>
            <EBF><EButton>인증 확인</EButton></EBF>
            </div>
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

const EBF = styled.div`
    text-align: center;
    width: 95%;
`

const EButton = styled.button`
    margin-top: .3rem;
    width: 40%;
    height: 2rem;
    color: white;
    background: none;
    border: none;
    outline: none;
    border-radius: 0.3rem;
    background-color: #F28379;
`

export default Confirm;