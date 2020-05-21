import React from "react";
import styled from "styled-components";
class UserInfo extends React.Component{
    render(){
        return(
            <Content>
                <div>이인경 님</div>
                <Img></Img>
                <Level>lv.로얄돼지</Level>
                <Type>
                    일식파
                </Type>
                <Type>
                    한식파
                </Type>
                <Type>
                    디저트파
                </Type>
                
            </Content>
        );
    }

}
const Content = styled.span`
    height: auto;
    width: 100%;
    // padding: 15%;
    align-items: center; 
    text-align:center;
    justify-content: center;
    align-items: center;
`;
const Img = styled.div`
    display: flex;
    justify-content: cneter;
    background-color:#404239;
    height: 90px;

`
const Level = styled.div`
    

`
const Type = styled.div`

`


export default UserInfo;