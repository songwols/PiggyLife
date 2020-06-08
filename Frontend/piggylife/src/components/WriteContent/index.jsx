import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Like } from "@styled-icons/boxicons-regular/Like";
import { Dislike } from "@styled-icons/boxicons-regular/Dislike";
import loading from "./loading.gif";

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
class WriteContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      searchShow: false,
      detail: [],
      showList: false,
      store_name: "",
      address: "",
      stores: [],
      v_img: "",
      v_name: "이름을 검색하고 싶으면 여기를 클릭하세요",
      v_category: "카테고리",
      v_address: "주소",
      v_tel: "전화번호",
      v_menu: "메뉴",
      v_memo: "메모",
      click: 0,
      visited: false,
      isLike: 0,
      g_color: "#5897A6",
      n_color: "gray",
      g_show: false,
      n_show: false,
      sid: "",
      file: "",
      previewURL: "",
      will: true,
      went: false,
      loading: false,
    };
    this.g_changeColor = this.g_changeColor.bind(this);
    this.n_changeColor = this.n_changeColor.bind(this);
  }

  showIcon() {
    this.setState({
      show: true,
      visited: true,
      isLike: 1,
      will: false,
      went: true,
    });
  }
  nonIcon() {
    this.setState({
      show: false,
      isLike: 0,
      visited: false,
      will: true,
      went: false,
    });
  }
  toggleSearch() {
    this.setState({
      searchShow: !this.state.searchShow,
    });
    if (this.state.click === 3) {
      this.setState({
        v_img: "",
        v_name: this.state.detail.name,
        v_category: this.state.detail.category,
        v_address: this.state.detail.address,
        v_tel: this.state.detail.tel,
        v_menu: this.state.detail.menues,
        sid: this.state.detail.sid,
        store_name: "",
      });
      if (this.state.detail.menues.length === 0) {
        this.setState({
          v_menu: "메뉴",
        });
      }
    }
  }

  toggleClose() {
    this.setState({
      searchShow: !this.state.searchShow,
      click: 0,
      store_name: "",
    });
  }

  VMemoChange = (e) => {
    this.setState({
      v_memo: e.target.value,
    });
  };

  onNameChange = (e) => {
    this.setState({
      store_name: e.target.value,
    });
  };

  toggleList() {
    this.setState({
      showList: !this.state.showList,
    });
  }
  addressChange(e) {
    this.setState({
      address: e.target.value,
    });
  }

  willChange = (e) => {
    this.setState({
      show: false,
      isLike: 0,
      visited: false,
      will: e.target.value,
      went: false,
    });
  };

  wentChange = (e) => {
    this.setState({
      show: true,
      visited: true,
      isLike: 1,
      will: false,
      went: e.target.value,
    });
  };

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
      this.props.storeStore.upload(this.state, formData);
    }
  };

  g_changeColor = (e) => {
    this.setState({
      g_color: e,
      n_color: "gray",
      g_show: true,
      n_show: false,
      isLike: 1,
      will: false,
      went: true,
    });
  };

  n_changeColor = (e) => {
    this.setState({
      n_color: e,
      g_color: "gray",
      n_show: true,
      g_show: false,
      isLike: -1,
      will: false,
      went: true,
    });
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

  searching = async (e) => {
    //여기에 로딩
    e.preventDefault();
    this.setState({
      loading: true,
    });
    await this.props.storeStore.search(this.state.store_name);
    const addr = this.props.storeStore.storeItems;
    this.setState({
      showList: !this.state.showList,
      click: 3,
      loading: false,
    });
    if (addr[0] !== undefined) {
      this.setState({
        address: addr[0].sid,
      });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <Popup>
          <PopupInner>
            <LIF>
              <LI src={loading}></LI>
            </LIF>
          </PopupInner>
        </Popup>
      );
    }
    let profile_preview = null;
    if (this.state.file !== "") {
      profile_preview = (
        <PvImg className="profile_preview" src={this.state.previewURL}></PvImg>
      );
    }
    const getDetail = async (e) => {
      e.preventDefault();
      //디테일 받아올 스토어
      await this.props.storeStore.detail(this.state.address);
      const getD = this.props.storeStore.detailPost;
      this.setState({
        detail: getD,
        store_name: getD.name + " - " + getD.address,
      });

      this.setState({
        showList: !this.state.showList,
      });
    };
    const lst = this.props.storeStore.storeItems;

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

        <FF onClick={this.toggleSearch.bind(this)}>
          <Input value={this.state.v_name} readOnly></Input>
        </FF>
        <Input value={this.state.v_category} readOnly></Input>
        <Input value={this.state.v_address} readOnly></Input>
        <Input value={this.state.v_tel} readOnly></Input>
        {this.state.v_menu === "메뉴" ? (
          <TextD>{this.state.v_menu}</TextD>
        ) : (
          <ML>
            {this.state.v_menu.map((item, index) => (
              <Mn key={index}>
                {" "}
                {item.menuName} - {item.price}
              </Mn>
            ))}
          </ML>
        )}

        <TextArea placeholder="메모" onChange={this.VMemoChange}></TextArea>
        <CheckDiv>
          <label>
            <BF onClick={this.nonIcon.bind(this)}>
              <CK
                type="radio"
                name="group"
                value="will"
                checked={this.state.will}
                onChange={this.willChange}
              />
            </BF>
            갈 곳
          </label>
          &nbsp;
          <label>
            <BF onClick={this.showIcon.bind(this)}>
              <CK
                type="radio"
                name="group"
                value="went"
                checked={this.state.went}
                onChange={this.wentChange}
              />
            </BF>
            간 곳
          </label>
        </CheckDiv>
        {this.state.show ? (
          <ICFrame>
            <Div onClick={() => this.g_changeColor("#5897A6")}>
              <Good style={{ color: this.state.g_color }} />
              좋아요
            </Div>
            <Div onClick={() => this.n_changeColor("#F28379")}>
              <NGood style={{ color: this.state.n_color }} />
              싫어요
            </Div>
          </ICFrame>
        ) : null}
        <Space />
        <EBF>
          <CButton onClick={this.goRegister}>등록</CButton>
        </EBF>
        {this.state.searchShow ? (
          <Popup>
            <PopupInner>
              <Close onClick={this.toggleClose.bind(this)}>X</Close>
              <Box>
                <Title>가게 이름 검색</Title>
                <Searching
                  value={this.state.store_name}
                  onChange={this.onNameChange}
                ></Searching>
                <BFrame>
                  <Cancel onClick={this.toggleSearch.bind(this)}>저장</Cancel>
                  &nbsp;
                  <OK onClick={this.searching}>검색</OK>
                </BFrame>
                <Notice>
                  *가게 이름을 입력하고 검색을 눌러 정보 선택 후, 저장을
                  눌러주세요.
                </Notice>
              </Box>
            </PopupInner>

            {this.state.showList ? (
              <PopupInner>
                <SFrame>
                  <Select onChange={this.addressChange.bind(this)}>
                    {lst.map((item, index) => (
                      <Option key={index} value={item.sid} defaultValue>
                        {item.name} - {item.address}
                      </Option>
                    ))}
                  </Select>
                </SFrame>
                <BFrame>
                  <Cancel onClick={this.toggleList.bind(this)}>닫기</Cancel>
                  &nbsp;
                  <OK onClick={getDetail}>확인</OK>
                </BFrame>
              </PopupInner>
            ) : null}
          </Popup>
        ) : null}
      </Content>
    );
  }
}

const Space = styled.div`
  height: 2rem;
`;

const Close = styled.button`
  background: none;
  border: none;
  outline: none;
  float: right;
  font-size: xx-large;
  margin: 0.3rem 0.5rem;
`;
const LIF = styled.div`
  margin: 20% 10% 45% 10%;
  height: 60%;
  width: 80%;
`;

const LI = styled.img`
  justify-content: center;
  align-items: center;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 95%;
`;

const TextD = styled.div`
  padding-left: 0.3rem;
  margin-top: 0.4rem;
  height: 2rem;
  border-style: solid;
  border-width: 0.05rem;
  border-radius: 0.3rem;
  border-color: gray;
  width: 96%;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ML = styled.div`
  padding-left: 0.3rem;
  margin-top: 0.4rem;
  border-style: solid;
  border-width: 0.05rem;
  border-radius: 0.3rem;
  border-color: gray;
  width: 96%;
  margin-bottom: 0.5rem;
`;
const Mn = styled.div``;

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
const FF = styled.button`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin-left: -0.2rem;
  float: left;
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
const CheckDiv = styled.div`
  width: 95%;
  margin-top: 0.4rem;
  height: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const BF = styled.button`
  background: none;
  border: none;
  outline: none;
`;

const CK = styled.input``;

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

const Popup = styled.div`
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const PopupInner = styled.div`
  position: absolute;
  left: 20%;
  right: 20%;
  top: 30%;
  bottom: 30%;
  margin: auto;
  background: white;

  border-radius: 4%;
  overflow: hidden;

  animation-name: zoom;
  animation-duration: 0.6s;

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const Box = styled.div`
  margin: 20% 10% 45% 10%;
  height: 70%;
  width: 80%;
  background-color: #ffe8bd;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas: "title" "searching" "bframe" "notice";
`;

const Notice = styled.div`
  padding-top: 0.2rem;
  grid-area: notice;
  background-color: white;
  font-size: smaller;
  margin-top: .2rem;
`;

const Title = styled.div`
  grid-area: "title";
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  -webkit-align-items: center;
`;

const Searching = styled.input`
  grid-area: "searching";
  font-size: 1rem;
  margin-top: 0.4rem;
  margin-left: 0.4rem;
  width: 90%;
  padding-left: 0.3rem;
  background: none;
  border-color: gray;
  border-style: solid;
  outline: none;
  box-shadow: none;
  border-width: 0.05rem;
  height: 2rem;
  border-top: hidden;
  border-left: hidden;
  border-right: hidden;
`;

const Cancel = styled.button`
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #f28379;
`;

const OK = styled.button`
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #5897a6;
`;
const SFrame = styled.div`
  margin: 35% 10% 25% 10%;
  // margin: 60% 10% 45% 10%;
  height: 4rem;
  width: 80%;
  background-color: #ffe8bd;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  height: 2rem;
  width: 80%;
`;

const Option = styled.option`
  height: 2rem;
  width: 80%;
  overflow: scroll;
`;

const BFrame = styled.div`
  grid-area: "bframe";
  margin-top: 0.4rem;
  height: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  -webkit-align-items: center;
`;
const ICFrame = styled.div`
  text-align: center;
  height: 2rem;
  width: 95%;
  display: inline-block;
  margin-bottom: 1rem;
`;

const Div = styled.button`
  background: none;
  border: none;
  outline: none;
`;

export default WriteContent;
