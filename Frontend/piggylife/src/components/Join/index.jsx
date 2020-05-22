import React from "react";
import styled from "styled-components";
import Confirm from "./confirm";
import Check from "./check";

class CJoin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showConfirm : false,
            showCheck : false,
        }
    }
    toggleConfirm(){
        this.setState({
            showConfirm: !this.state.showConfirm,
        })
    }

    toggleCheck(){
        this.setState({
            showCheck: !this.state.showCheck,
        })
    }

    render(){
        return(
            <Frame>
                EMAIL
                <Input placeholder="이메일을 입력해주세요"></Input>
                <EBF><EButton onClick={this.toggleConfirm.bind(this)}>이메일 인증</EButton></EBF>
                {this.state.showConfirm ? (
                <Confirm/>
                ) : null}
                <Space></Space>
                닉네임
                <Input placeholder="닉네임"></Input>
                <Space></Space>
                PASSWORD
                <Input placeholder="비밀번호"></Input>
                <Input placeholder="비밀번호 확인"></Input>
                <Space></Space>
                <EBF><CButton onClick={this.toggleCheck.bind(this)}>회원가입</CButton></EBF>
                {this.state.showCheck ? (
                <Check cancelCheck={this.toggleCheck.bind(this)}/>
                ) : null}

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


export default CJoin;