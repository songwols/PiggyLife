import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Pencil } from "@styled-icons/boxicons-regular/Pencil";

export const PencilIncon = styled(Pencil)`
    width: 1rem;
    cursor: pointer;
    // float: left;
    margin-top: 5rem;
    opacity: 50%;
`;


class EditPro extends React.Component{
    render(){
        return(
            <Frame>
                <ProfileImage src="https://image.flaticon.com/icons/svg/747/747376.svg"></ProfileImage>
                <E type="file"></E>
                <Space></Space>
                EMAIL
                <Input value="이메일@ssafy.com" readOnly></Input>
                <Space></Space>
                닉네임
                <Input value="ssafy"></Input>
                <Space></Space>
                PW
                <Input value="패스워드" type="password"></Input>
                <Space></Space>
                <BF>
                <SButton>탈퇴하기</SButton> &nbsp;
                <Link to={"/feed"} style={{ textDecoration: "none" }}><EButton>수정하기</EButton></Link>
                </BF>
            </Frame>
        )
    }
}

const Space = styled.div`
    height: 2rem;
`

const Frame = styled.div`
    grid-area: "content";
    // height: 100%;
    padding: 10%;
    // margin-top: 20%;
`
const ProfileImage = styled.img`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 50%;
    border-color: gray;
    border-style: solid;
`;

const E = styled.input`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
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

const BF = styled.div`
    text-align: center;
    width: 95%;
`

const SButton = styled.button`
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

export default EditPro;