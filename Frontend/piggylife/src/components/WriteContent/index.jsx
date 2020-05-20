import React from "react";
import styled from "styled-components";
import IFrame from "./icon"
import Search from "./search"

class WriteContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show : false,
            searchShow: false,
        }
    }
    showIcon(){
        this.setState({
            show: true,
        })
    }
    nonIcon(){
        this.setState({
            show: false,
        })
    }
    toggleSearch() {
        this.setState({
            searchShow: !this.state.searchShow,
        });
      }
    

    render(){
        return(
            <Content>
                <Pic type="file"></Pic>
                {this.state.show ? (
                <IFrame></IFrame>
                ) : null}
                <FF onClick={this.toggleSearch.bind(this)}><Input placeholder="이름을 검색하고 싶으면 여기를 클릭하세요" readOnly></Input></FF>
                <Input placeholder="카테고리" readOnly></Input>
                <Input placeholder="주소" readOnly></Input>
                <Input placeholder="전화번호" readOnly></Input>
                <TextArea placeholder="메뉴" readOnly></TextArea>
                <TextArea placeholder="메모"></TextArea>
                <CheckDiv>
                    <label><BF onClick={this.nonIcon.bind(this)}><CK type="radio" name="group" value="will"/></BF>갈 곳</label>&nbsp;
                    <label><BF onClick={this.showIcon.bind(this)}><CK type="radio" name="group" value="went"/></BF>간 곳</label>            
                </CheckDiv>
                <EBF><CButton>검색</CButton></EBF>
                {this.state.searchShow ? (
                <Search cancelSearch={this.toggleSearch.bind(this)}/>
                ) : null}
            </Content>
        )
    }
}

const Content = styled.div`
    grid-area: "content";
    height: 100%;
    padding: 10%;
`
const Pic = styled.input`
    height: 5rem;
    border-style: solid;
    border-width: 0.05rem;
    border-color: gray;
    width: 95%;
`
const FF = styled.button`
    width: 100%;
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin-left: -0.2rem;
    float: left;
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
const CheckDiv = styled.div`
    width: 95%;
    margin-top: .3rem;
    height: 2rem;
    text-align: center;
`

const BF = styled.button`
    background: none;
    border: none;
    outline: none;
`

const CK = styled.input`

`

const EBF = styled.div`
    text-align: center;
    width: 95%;
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

export default WriteContent;