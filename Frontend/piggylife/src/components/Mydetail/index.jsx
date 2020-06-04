import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Map from "../DMap"

@inject("storeStore")
@withRouter
@observer
class Mydetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            store_name:"",
            address: "",
            img: "",
            category: "",
            address: "",
            tel: "",
            menu: "등록된 메뉴가 없습니다.",
            memo: "",
            latitude: "",
            longitude: "",
            visited: false,
            isLike: 0,
            confirms: false,
        }
    }

    toggleConfirm() {
        this.setState({
            confirmS: !this.state.confirmS,
        });
    }

    async componentWillMount() {
        window.scrollTo(0, 0);
        await this.props.storeStore.mydetail(this.props.id);
        const post = this.props.storeStore.mydetailPost;
        this.setState({
            store_name: post.store.name,
            address: post.store.address,
            img: post.image, //post.image
            category: post.store.category,
            tel: post.store.tel,
            menu: post.store.menues,
            memo: post.content,
            latitude: post.store.latitude,
            longitude: post.store.latitude,
            visited: post.visited,
            isLike: post.isLike,
        })
        if(post.store.menues.length===0){
            this.setState({
                menu: "등록된 메뉴가 없습니다.",
            })
        }
      }
    
    render(){
        const goEdit = (e) => {
            e.preventDefault();
           this.props.history.push("/editdetail/" + this.props.id);
          };

        const goDelete = (e) => {
            e.preventDefault();
            this.props.storeStore.postdelete(this.props.id);
        };

        return(
            <Frame>
                <Pic>
                    { (this.state.img === "" || this.state.img === null ) ? 
                    <Text>등록된 이미지가 없습니다.</Text> : <Simg src={this.state.img}></Simg>}
                </Pic>
                <Info>
                    <Text>{this.state.store_name}</Text>
                    <Text>{this.state.address}</Text>
                    <Text>{this.state.tel}</Text>
                </Info>
                <Menu>
                    <Text>메뉴</Text>
                    {this.state.menu==="등록된 메뉴가 없습니다." ? <Context>{this.state.menu}</Context> 
                :
                <div>
                  {this.state.menu.map((item, index) => <Context key={index}> {item.menuName} - {item.price}</Context>)}
                </div>
                }
                </Menu>
                <Map id={this.props.id} keyword="mydetail"></Map>
                <Tag>태그</Tag>
                <Memo>
                    <Text>메모</Text>
                    <Context>{this.state.memo}</Context> 
                </Memo>
                <BFrame>
                    <Cancel onClick={this.toggleConfirm.bind(this)}>삭제</Cancel>&nbsp;
                    <OK onClick={goEdit}>수정</OK>
                </BFrame>
                <Context/>
                {this.state.confirmS ? (
                    <Popup>
                        <PopupInner>
                            <Box>
                                <Title>삭제하시겠습니까?</Title>
                                <BFrame>
                                <BF>
                                <Cancel onClick={this.toggleConfirm.bind(this)}>취소</Cancel>&nbsp;
                                <OK onClick={goDelete}>확인</OK>
                                </BF>
                                </BFrame>
                            </Box>
                        </PopupInner>
                    </Popup>
                ) : null}
            </Frame>
        )
    }
}
const Simg = styled.img`
  justify-content: center;
  align-items: center;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Frame = styled.div`
    height: 100%;
    display: grid;
    padding: 0 15px 0 15px;
    grid-template-rows: repeat(8, auto);
    grid-template-areas: "pic" "info" "menu" "map" "tag" "memo" "button";
`
const Pic = styled.div`
    grid-area: "pic";
    margin-top: .5rem;
    height: 10rem;
`

const Info = styled.div`
    grid-area: "info";
    margin-top: .5rem;
    // height: 5rem;
`

const Menu = styled.div`
    grid-area: "menu";
    margin-top: .5rem;
    // height: 5rem;
`

const Tag = styled.div`
    grid-area: "tag";
    margin-top: .5rem;
    height: 5rem;
`

const Memo = styled.div`
    grid-area: "memo";
    margin-top: .5rem;
    height: 7rem;
`

const Text = styled.div`
    min-height: 2rem;
    font-size: larger;
`

const Context = styled.div`
    height: 2rem;
`
const BFrame = styled.div`
  grid-area: "button";
  margin-top: .3rem;
  height: 2rem;
  text-align: center;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  -webkit-justify-content: center; 
  -webkit-align-items: center;
`

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
  background-color: #5897A6;
`
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
  top: 20%;
  bottom: 20%;
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
  margin: 45% 10% 45% 10%;
  height: 40%;
  width: 80%;
  background-color: #ffe8bd;
  display: grid;
  grid-template-rows: repeat(2,1fr);
  grid-template-areas: "title" "bframe";

`
const Title = styled.div`
  grid-area: "title";
  display: flex; 
  align-items: center; 
  justify-content: center; 
  -webkit-justify-content: center; 
  -webkit-align-items: center;

`

const BF = styled.div`
    text-align: center;
    width: 95%;
`

export default Mydetail;