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
            password:"",
            email: window.sessionStorage.getItem("email"),
            file: "",
            previewURL: "",
        }
    }
    async componentWillMount(){
        const email = window.sessionStorage.getItem("email")
        await this.props.userStore.whoami(email)
        console.log(this.props.userStore.nickname)
        const nname = this.props.userStore.nickname;
        const nimage = this.props.userStore.image;
        this.setState({
            nickname: nname,
            previewURL: nimage,
        })
    }
    toggleConfirm() {
        this.setState({
            confirmS: !this.state.confirmS,
        });
    }
    updateInfo=(e)=>{
        var formData = "";
        if(this.state.file!==""){
            formData = new FormData();
            formData.append("file", this.state.file);
        }
        else{
            formData = null;
        }

        this.props.userStore.updateUser(this.state, formData); 
    };

    handleChange = (e) => {
        this.setState({
          image : "",
          nickname: e.target.value,
          email: this.state.email,
          password: this.state.password,
        })
      };
      passwordChange = (e) => {
        this.setState({
          image : "",
          nickname: this.state.nickname,
          email: this.state.email,
          password: e.target.value,
        })
      };
      handleFileOnChange = (e) => {
        e.preventDefault();
        console.log(e.target.files);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            previewURL: reader.result,
          });
        };
        reader.readAsDataURL(file);
      };
      
    render(){
        let profile_preview = null;
        if (this.state.file === "") {
            console.log("여기")
            profile_preview = (
                <ProfileImage src="https://image.flaticon.com/icons/svg/747/747376.svg"></ProfileImage>
            );
        }
        else {
            profile_preview = (
                <ProfileImage src={this.state.previewURL}></ProfileImage>
            );
        }
        
        return(
            <Frame>
                {/* <ProfileImage src="https://image.flaticon.com/icons/svg/747/747376.svg"></ProfileImage> */}
                {profile_preview}
                <E encType="multipart/form-data"
                type="file"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                name="profile_img"
                onChange={this.handleFileOnChange}
                ></E>
                <Space></Space>
                EMAIL
                <Input value={this.state.email} readOnly></Input>
                <Space></Space>
                닉네임
                <Input value={this.state.nickname} onChange={this.handleChange}></Input>
                <Space></Space>
                PW
                <Input value={this.state.password} type="password" onChange={this.passwordChange}></Input>
                <Space></Space>
                <BF>
                <SButton onClick={this.toggleConfirm.bind(this)}>탈퇴하기</SButton> &nbsp;
                <EButton onClick={this.updateInfo}>수정하기</EButton>
                    
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