import React from "react";
import styled from "styled-components";

class Search extends React.Component{
    render(){
        return(
            <Popup>
                <PopupInner></PopupInner>
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
  left: 25%;
  right: 25%;
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

  @media (max-width: 733px) {
    left: 10%;
    right: 10%;
    top: 10%;
    bottom: 15%;
  }

  @media (min-width: 733px) and (max-width: 1024px) {
    top: 10%;
    bottom: 15%;
  }
`;


export default Search;