import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Pencil } from "@styled-icons/boxicons-regular/Pencil";
import Secession from "./secession"
import {inject,observer} from "mobx-react"

export const PencilIncon = styled(Pencil)`
    width: 1rem;
    cursor: pointer;
    // float: left;
    margin-top: 5rem;
    opacity: 50%;
`;

@inject("userStore")
@observer
class EditPro extends React.Component{
    constructor(props){
        super(props);
        this.state={
            confirmS : false,
            nickname : "",
            image:"",
            token:"",
        }
    }
    async componentWillMount(){
        const email = sessionStorage.getItem("email")
        await this.props.userStore.whoami(email)
        console.log(this.props.userStore.nickname)
        const nname = this.props.userStore.nickname;
        this.setState({
            nickname: nname,
        })
    }
    toggleConfirm() {
        this.setState({
            confirmS: !this.state.confirmS,
        });
    }
    updateInfo=(e)=>{
        console.log(sessionStorage.getItem("token"))
        this.setState({
            image : "수정이미지",
            nickname : this.state.nickname,
            token: sessionStorage.getItem("token"),
        });
        
        this.props.userStore.updateUser(this.state); 
    };
    handleChange = (e) => {
        this.setState({
          image : "수정이미지",
          nickname: e.target.value,
          token: sessionStorage.getItem("token"),
        })
      };
    render(){
        return(
            <Frame>
                <ProfileImage src="https://image.flaticon.com/icons/svg/747/747376.svg"></ProfileImage>
                <E type="file"></E>
                <Space></Space>
                EMAIL
                <Input value={this.props.userStore.email} readOnly></Input>
                <Space></Space>
                닉네임
                <Input value={this.state.nickname} onChange={this.handleChange}></Input>
                <Space></Space>
                PW
                <Input value="패스워드" type="password" readOnly></Input>
                <Space></Space>
                <BF>
                <SButton onClick={this.toggleConfirm.bind(this)}>탈퇴하기</SButton> &nbsp;
                {/* <Link to={"/feed"} style={{ textDecoration: "none" }}> */}
                    <EButton onClick={this.updateInfo}>수정하기</EButton>
                    {/* </Link> */}
                </BF>
                {this.state.confirmS ? (
                <Secession cancelSecession={this.toggleConfirm.bind(this)}/>
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