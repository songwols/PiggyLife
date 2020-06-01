import React from "react";
import styled from "styled-components";
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

class IFrame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            g_color: "gray",
            n_color: "gray",
            g_show: false,
            n_show: false,
        }
        this.g_changeColor = this.g_changeColor.bind(this);
        this.n_changeColor = this.n_changeColor.bind(this);
    }
    g_changeColor = (e) =>{
        this.setState({g_color: e, n_color: "gray", g_show: true, n_show: false})
    }

    n_changeColor = (e) =>{
        this.setState({n_color: e, g_color: "gray", n_show: true, g_show: false})
    }

    render(){
        return(
            <ICFrame>
                <Div onClick={() => this.g_changeColor("#5897A6")}>
                <Good style={{color: this.state.g_color}}/>좋아요
                </Div>

                <Div onClick={() => this.n_changeColor("#F28379")}>
                <NGood style={{color: this.state.n_color}}/>싫어요
                </Div>
            </ICFrame>
        )
    }
}

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

export default IFrame;