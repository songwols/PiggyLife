import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Like } from "@styled-icons/boxicons-regular/Like";
import { Dislike } from "@styled-icons/boxicons-regular/Dislike";

export const Good = styled(Like)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: red;
  margin-left: auto;
  margin-right: auto;
`;

export const NGood = styled(Dislike)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
`;

@inject("storeStore")
@inject("userStore", "colorStore")
@observer
class AdminRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      store_name: "",
      address: "",
      stores: [],
      v_img: "",
      v_name: "",
      v_category: "",
      v_address: "",
      v_tel: "",
      v_menu: "",
      click: 0,
      file: "",
      previewURL: "",
      loading: false,
    };
  }

  nameChange = (e) => {
    this.setState({
        v_name: e.target.value,
    });
  };
  
  categoryChange(e) {
    this.setState({
      v_address: e.target.value,
    });
  }

  addressChange(e) {
    this.setState({
      v_address: e.target.value,
    });
  }

  telChange(e) {
    this.setState({
      v_tel: e.target.value,
    });
  }

  menuChange(e) {
    this.setState({
      v_menu: e.target.value,
    });
  }

  goRegister = (e) => {
    var formData = "";
    if (this.state.file !== "") {
      formData = new FormData();
      formData.append("file", this.state.file);
    } else {
      formData = null;
    }
    if (this.state.v_name === "이름을 검색하고 싶으면 여기를 클릭하세요") {
      alert("빈 값이 있습니다.");
    } else {
      this.props.colorStore.setHomeColor("#cccccc");
      this.props.colorStore.setFeedColor("#5897A6");
      this.props.colorStore.setPostColor("#cccccc");
      this.props.colorStore.setMapColor("#cccccc");
      this.props.colorStore.setMatchColor("#cccccc");
    //   this.props.storeStore.upload(this.state, formData);
    }
  };


  handleFileOnChange = (e) => {
    e.preventDefault();
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

  render() {
    let profile_preview = null;
    if (this.state.file !== "") {
      profile_preview = (
        <PvImg className="profile_preview" src={this.state.previewURL}></PvImg>
      );
    }

    return (
      <Content>
        <PF>
          <Pic
            encType="multipart/form-data"
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            name="store_img"
            onChange={this.handleFileOnChange}
          ></Pic>
          {profile_preview}
        </PF>

        <Input placeholder="이름" value={this.state.v_name} onChange={this.nameChange}></Input>
        <Input placeholder="카테고리" value={this.state.v_category} onChange={this.categoryChange}></Input>
        <Input placeholder="주소" value={this.state.v_address} onChange={this.addressChange}></Input>
        <Input placeholder="전화번호" value={this.state.v_tel} onChange={this.telChange}></Input>
        <TextArea placeholder="메뉴" value={this.state.v_memu} onChange={this.memuChange}></TextArea>
        <Space />
        <EBF>
          <CButton onClick={this.goRegister}>등록</CButton>
        </EBF>
      </Content>
    );
  }
}

const Space = styled.div`
  height: 2rem;
`;

const Content = styled.div`
  grid-area: "content";
  height: 100%;
  padding: 10% 10% 5% 10%;
`;
const PF = styled.div`
  padding-top: 2rem;
  height: auto;
  margin-bottom: 0.5rem;
`;
const PvImg = styled.img`
  justify-content: center;
  align-items: center;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 95%;
  height: 5rem;
`;

const Pic = styled.input`
  border-style: solid;
  border-width: 0.05rem;
  border-radius: 0.3rem;
  border-color: gray;
  height: 2rem;
  width: 97%;
`;

const Input = styled.input`
  font-size: 1rem;
  margin-top: 0.4rem;
  width: 95%;
  padding-left: 0.3rem;
  background: none;
  border-color: gray;
  border-style: solid;
  border-radius: 0.3rem;
  outline: none;
  box-shadow: none;
  border-width: 0.05rem;
  height: 2rem;
  margin-bottom: 0.5rem;
`;

const EBF = styled.div`
  text-align: center;
  width: 95%;
`;

const CButton = styled.button`
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #5897a6;
`;

const TextArea = styled.textarea`
  display: block;
  font-size: 1rem;
  resize: none;
  width: 95%;
  padding-left: 0.3rem;
  background: none;
  border-color: gray;
  border-style: solid;
  border-radius: 0.3rem;
  outline: none;
  box-shadow: none;
  border-width: 0.05rem;
  height: 5rem;
  line-height: 2rem;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
`;

export default AdminRegister;
