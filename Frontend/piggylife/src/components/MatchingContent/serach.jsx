import React from "react";
import styled from "styled-components";
import logo from "./logo_match.png";

class Search extends React.Component {
  render() {
    return (
      <Content>
        <Box1>
          <Img src={logo}></Img>
        </Box1>
        <Box2>
          <Input placeholder="궁합 상대의 메일을 넣어주세요"></Input>
          <EBF>
            <CButton>Search</CButton>
          </EBF>
        </Box2>
      </Content>
    );
  }
}
const Content = styled.div`
  grid-area: "content";
  padding: 10%;
`;
const Box1 = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100%;
  object-fit: cover;
  margin: auto;
`;
const Img = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 170px;
  object-fit: cover;
  margin: auto;
`;
const Box2 = styled.div`
  widtj: 100%;
  background-color: #ffe8bd;
  border-radius: 0.5rem;
  padding: 5% 10% 5% 10%;
`;
const Input = styled.input`
  font-size: 1rem;
  margin-top: 0.3rem;
  width: 98%;
  padding-left: 0.3rem;
  background: none;
  background-color: #ffffff;
  border-color: gray;
  border-style: solid;
  border-radius: 0.3rem;
  outline: none;
  box-shadow: none;
  border-width: 0.05rem;
  height: 2rem;
  text-align: center;
`;

const EBF = styled.div`
  text-align: center;
  width: 95%;
`;

const CButton = styled.button`
  margin-top: 0.7rem;
  width: 30%;
  height: 2rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  background-color: #ff7566;
`;

export default Search;
