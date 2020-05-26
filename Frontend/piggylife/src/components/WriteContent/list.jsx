import React from "react";
import styled from "styled-components";

class List extends React.Component{
  constructor() {
    super();
    this.state = {
      address: "",
    };
  }

  addressChange(e) {
    this.setState({
      address: e.target.value,
    });
  };

    render(){
      const searching = (e) => {
        e.preventDefault();
        
      };
  
        return(
            <Popup>
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
                      <Cancel onClick={this.props.cancelList}>닫기</Cancel>&nbsp;
                      <OK onClick={searching}>확인</OK>
                    </BFrame>
                </PopupInner>
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

export default List;