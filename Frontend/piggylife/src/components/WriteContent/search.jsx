import React from "react";
import styled from "styled-components";
import List from "./list";

class Search extends React.Component{
    constructor(props){
      super(props);
      this.state={
          showList : false,
      }
    }

    toggleList() {
      this.setState({
        showList: !this.state.showList,
      });
    }

    render(){
        return(
            <Popup>
                <PopupInner>
                  <Box>
                    <Title>가게 이름 검색</Title>
                    <Searching></Searching>
                    <BFrame>
                      <Cancel onClick={this.props.cancelSearch}>닫기</Cancel>&nbsp;
                      <OK onClick={this.toggleList.bind(this)}>검색</OK>
                    </BFrame>
                  </Box>
                </PopupInner>
                {this.state.showList ? (
                <List cancelList={this.toggleList.bind(this)}/>
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

export default Search;