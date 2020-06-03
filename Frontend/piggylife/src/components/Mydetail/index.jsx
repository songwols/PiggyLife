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
        }
    }

    async componentWillMount() {
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
            //디테일 받아올 스토어
           console.log(this.props.id)
           this.props.history.push("/editdetail/" + this.props.id);
          };

        console.log(this.state.img)
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
                    <OK onClick={goEdit}>수정</OK>
                </BFrame>
                <Context/>
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
    height: 2rem;
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

export default Mydetail;