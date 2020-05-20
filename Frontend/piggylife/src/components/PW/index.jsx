import React from "react";
import styled from "styled-components";
import Confirm from "../Join/confirm";
import { Link } from "react-router-dom";

class PW extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showConfirm : false,
        }
    }
    toggleConfirm(){
        this.setState({
            showConfirm: !this.state.showConfirm,
        })
    }

    render(){
        return(
            <Frame>
                <Space></Space>
                EMAIL
                <Input placeholder="이메일을 입력해주세요"></Input>
                <EBF><EButton onClick={this.toggleConfirm.bind(this)}>이메일 인증</EButton></EBF>
                {this.state.showConfirm ? (
                <Confirm/>
                ) : null}
                <Space></Space>
                <Space></Space>
                <Space></Space>
                <EBF><Link to={"/"} style={{ textDecoration: "none" }}><CButton>비번 찾기</CButton></Link></EBF>
            </Frame>
        )
    }
}

const Space = styled.div`
    height: 2rem;
`

const Frame = styled.div`
    grid-area: "content";
    padding: 10%;
    width: 100wh;
    
`

const Input = styled.input`
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
    background-color: #5897A6;
`

const CButton = styled.button`
    margin-top: .3rem;
    width: 30%;
    height: 2rem;
    color: white;
    background: none;
    border: none;
    outline: none;
    border-radius: 0.3rem;
    background-color: #5897A6;
`

export default PW;