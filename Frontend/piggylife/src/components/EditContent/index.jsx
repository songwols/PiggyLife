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
@inject("userStore")
@observer
class WriteContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show : false,
            stores: [],
            v_img: "",
            v_name: "이름",
            v_category: "카테고리",
            v_address: "주소",
            v_tel: "전화번호",
            v_menu: "메뉴",
            v_memo: "메모",
            visited: false,
            isLike: 0,
            g_color: "#5897A6",
            n_color: "gray",
            g_show: false,
            n_show: false,
            sid: "",
            will:false,
            went:false,
            file: "",
            previewURL: "",
        }
        this.g_changeColor = this.g_changeColor.bind(this);
        this.n_changeColor = this.n_changeColor.bind(this);
    }

    async componentWillMount() {
        await this.props.storeStore.mydetail(this.props.id);
        const post = this.props.storeStore.mydetailPost;
        this.setState({
            v_name: post.store.name,
            v_address: post.store.address,
            v_img: post.image, //post.image
            v_category: post.store.category,
            v_tel: post.store.tel,
            v_menu: post.store.menues,
            v_memo: post.content,
            v_latitude: post.store.latitude,
            v_longitude: post.store.latitude,
            visited: post.visited,
            isLike: post.isLike,
            sid: post.store.sid,
            previewURL: post.image,
        })
        if(post.visited===true){
            this.setState({
                show: true,
                went: true,
            })
            if(post.isLike===1){
                this.setState({
                    g_color: "#5897A6", 
                    n_color: "gray", 
                    g_show: true, 
                    n_show: false, 
                    isLike: 1,
                })
            }
            else{
                this.setState({
                    n_color: "#F28379", 
                    g_color: "gray", 
                    n_show: true, 
                    g_show: false, 
                    isLike: -1,})
            }
        }
        else{
            this.setState({
                will: true,
            })
        }
    }

    showIcon(){
        this.setState({ //간 곳
            show: true,
            visited: true,
            isLike: 1,
            will: false,
            went: true,
        })
    }
    nonIcon(){
        this.setState({ //갈 곳
            show: false,
            isLike: 0,
            visited: false,
            will: true,
            went: false,
        })
    }

    VMemoChange = (e) => {
        this.setState({
            v_memo : e.target.value,
        })
    }

    wentChange = (e) => { //간 곳
        this.setState({
            show: true,
            visited: true,
            isLike: 1,
            will: false,
            went: e.target.value,
        });
      };

    willChange = (e) => { //갈 곳
        this.setState({
            show: false,
            isLike: 0,
            visited: false,
            will: e.target.value,
            went: false,
        });
    };
      
      goRegister = (e) => {
        const formData = new FormData();
        formData.append("file", this.state.file);
        this.props.storeStore.postupdate(this.state, formData, this.props.id);
      }

      g_changeColor = (e) =>{
        this.setState({g_color: e, n_color: "gray", g_show: true, n_show: false, isLike: 1,})
    }

    n_changeColor = (e) =>{
        this.setState({n_color: e, g_color: "gray", n_show: true, g_show: false, isLike: -1,})
    }
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

    render(){
        let profile_preview = null;
        if (this.state.file !== "") {
            profile_preview = (
                <PvImg className="profile_preview" src={this.state.previewURL}></PvImg>
            );
        }
        else if(this.v_img !== ""){
            profile_preview = (
                <PvImg className="profile_preview" src={this.state.previewURL}></PvImg>
            );
        }
        return(
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
                {this.state.show ? (
                <ICFrame>
                    <Div onClick={() => this.g_changeColor("#5897A6")}>
                    <Good style={{color: this.state.g_color}}/>좋아요
                    </Div>

                    <Div onClick={() => this.n_changeColor("#F28379")}>
                    <NGood style={{color: this.state.n_color}}/>싫어요
                    </Div>
                </ICFrame>
                ) : null}
                <Input value={this.state.v_name} readOnly></Input>
                <Input value={this.state.v_category} readOnly></Input>
                <Input value={this.state.v_address} readOnly></Input>
                <Input value={this.state.v_tel} readOnly></Input>
                {/* <TextArea value={this.state.v_menu} readOnly></TextArea> */}
                {this.state.v_menu==="메뉴" ? <TextD>{this.state.v_menu}</TextD> 
                :
                <ML>
                  {this.state.v_menu.map((item, index) => <Mn key={index}> {item.menuName} - {item.price}</Mn>)}
                </ML>
                }
                
                <TextArea value={this.state.v_memo} onChange={this.VMemoChange}></TextArea>
                <CheckDiv>
                    <label><BF onClick={this.nonIcon.bind(this)}>
                        <CK type="radio" name="group" value="will" checked={this.state.will} onChange={this.willChange}/>
                        </BF>갈 곳</label>&nbsp;
                    <label><BF onClick={this.showIcon.bind(this)}>
                        <CK type="radio" name="group" value="went" checked={this.state.went} onChange={this.wentChange}/>
                        </BF>간 곳</label>            
                </CheckDiv>
                <EBF><CButton onClick={this.goRegister}>완료</CButton></EBF>
            </Content>
        )
    }
}

const PF = styled.div`
  height: auto;
`;

const PvImg = styled.img`
  justify-content: center;
  align-items: center;
  // position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 95%;
  height: 5rem;
`;

const TextD = styled.div`
    padding-left: .3rem;
    margin-top: .3rem;
    height: 2rem;
    border-style: solid;
    border-width: 0.05rem;
    border-radius: 0.3rem;
    border-color: gray;
    width: 96%;
    display: flex;
    align-items: center;
`

const ML = styled.div`
    padding-left: .3rem;
    margin-top: .3rem;
    border-style: solid;
    border-width: 0.05rem;
    border-radius: 0.3rem;
    border-color: gray;
    width: 96%;
`
const Mn = styled.div `

`

const Content = styled.div`
    grid-area: "content";
    height: 100%;
    padding: 10% 10% 5% 10%;
`
const Pic = styled.input`
    height: 2rem;
    border-style: solid;
    border-width: 0.05rem;
    border-color: gray;
    width: 95%;
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

const ICFrame = styled.div`
    text-align: center;
    height: 2rem;
    width: 95%;
    display: inline-block;
`

const Div = styled.button`
    background: none;
    border: none;
    outline: none;
`

export default WriteContent;