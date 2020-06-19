import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Card from "./Card";

@inject("storeStore","userStore")
@observer
class CardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      check: true,
    };
  }

  async UNSAFE_componentWillMount() {
    await this.props.userStore.whoami(window.sessionStorage.getItem("email"))
    await this.props.storeStore.requestFindAll()
    await this.props.storeStore.requestFindMy(window.sessionStorage.getItem("uid"))
  }

  render() {
    const list=this.props.storeStore.RFindAll;
    const list2=this.props.storeStore.RFindMy;
    const check = this.props.userStore.superuser;
    return (
      <OUT>
        {check ? 
        (<div>
        {list.length !== 0 ? (
          <Frame>
            {list.map((item, index) => (
              <Card key={index} store={item}/>
            ))}
          </Frame>
        ) : (
          <NFrame>
            <Text>등록된 게시글이 없습니다.</Text>
          </NFrame>
        )}
        </div>) : 
        (<div>
          {list2.length !== 0 ? (
          <Frame>
            {list2.map((item, index) => (
              <Card key={index} store={item}/>
            ))}
          </Frame>
        ) : (
          <NFrame>
            <Text>등록된 게시글이 없습니다.</Text>
          </NFrame>
        )}
        </div>)}
        
      </OUT>
    );
  }
}

const OUT = styled.div`
    margin-bottom: 2rem;
    height: 100%;
    overflow: auto;
`
const Text = styled.div`
  margin-top: 40px;
`;

const NFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Frame = styled.div`
//   width: 100%;
  display: grid;
  grid-template-rows: repeat(5, 5rem);
//   grid-template-columns: 100%;
  grid-row-gap: 3%;
  margin-left: 10%;
  margin-right: 10%;
  white-space: nowrap;
//   overflow-x: scroll;
//   overflow-y: hidden;
`;

export default CardLayout;
