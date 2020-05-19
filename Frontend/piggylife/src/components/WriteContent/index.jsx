import React from "react";
import styled from "styled-components";

class WriteContent extends React.Component{
    render(){
        return(
            <Content>
                <Pic></Pic>
                <Input placeholder="이름을 검색하고 싶으면 여기를 클릭하세요" readOnly></Input>
                <Input placeholder="카테고리" readOnly></Input>
                <Input placeholder="주소" readOnly></Input>
                <Input placeholder="전화번호" readOnly></Input>
                <TextArea placeholder="메뉴" readOnly></TextArea>
                <TextArea placeholder="메모"></TextArea>
            </Content>
        )
    }
}

const Content = styled.div`
    grid-area: "content";
    padding: 10%;
`
const Pic = styled.div`
    height: 5rem;
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

const TextArea = styled.textarea`
    display: block;
    font-size: 1.0rem;
    resize: none;
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
    height: 5rem;
    line-height: 2rem;
`

export default WriteContent;