import React from "react";
import styled from "styled-components";

class Search extends React.Component{
    constructor(props){
      super(props);
      this.state={
          showList : false,
          store_name:"",
          address: "",
      }
    }

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
    };

    render(){
      const getList = (e) => {
        e.preventDefault();
        //리스트를 받아올 스토어
        console.log(this.state.store_name)
        // this.props.storeStore.setInfo(this.state.info);
        // this.props.storeStore.search(this.state.info);
        this.setState({
          showList: !this.state.showList,
        })
      };
      const searching = (e) => {
        e.preventDefault();
        //디테일 정보 받아올 스토어
        // this.props.storeStore.search(this.state.address);
        // this.props.history.push(
        //   "/result/" +
        //     this.state.info.store_name
        // );
      };
  
        return(
            <Popup>
                <PopupInner>
                  <Box>
                    <Title>가게 이름 검색</Title>
                    <Searching value={this.state.store_name} onChange={this.onNameChange}></Searching>
                    <BFrame>
                      <Cancel onClick={this.props.cancelSearch}>닫기</Cancel>&nbsp;
                      <OK onClick={getList} >검색</OK>
                    </BFrame>
                  </Box>
                </PopupInner>
                {this.state.showList ? (
                  <PopupInner>
                  <SFrame>
                  <Select onChange={this.addressChange.bind(this)}>
                      <Option defaultValue>셀렉트박스</Option>
                      <Option>옵션1</Option>
                      <Option>옵션2</Option>
                      <Option>옵션3</Option>
                      <Option>옵션4</Option>
                  </Select>
                  </SFrame>
                  <BFrame>
                    <Cancel onClick={this.props.cancelSearch}>닫기</Cancel>&nbsp;
                    <OK onClick={searching}>확인</OK>
                  </BFrame>
              </PopupInner>
                ) : null}
            </Popup>
        )
    }
}

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
  grid-template-rows: repeat(3,1fr);
  grid-template-areas: "title" "searching" "bframe";

`
const Title = styled.div`
  grid-area: "title";
  display: flex; 
  align-items: center; 
  justify-content: center; 
  -webkit-justify-content: center; 
  -webkit-align-items: center;

`

const Searching = styled.input`
  grid-area: "searching";
  font-size: 1.0rem;
  margin-top: .3rem;
  margin-left: .4rem;
  width: 90%;
  padding-left: .3rem;
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
`


const Cancel = styled.button`
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #F28379;
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
const SFrame = styled.div`
    margin: 60% 10% 45% 10%;
    height: 4rem;
    width: 80%;
    background-color: #ffe8bd;
    text-align: center;
    display: flex; 
    align-items: center; 
    justify-content: center; 
`

const Select = styled.select`
    height: 2rem;
    width: 80%;
`

const Option = styled.option`
    height: 2rem;
    width: 80%;
    overflow:scroll;
`

const BFrame = styled.div`
  grid-area: "bframe";
  margin-top: .3rem;
  height: 2rem;
  text-align: center;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  -webkit-justify-content: center; 
  -webkit-align-items: center;
`

export default Search;