import React from 'react';
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import MainPage from "./pages/Mainpage";
import Join from "./pages/Join";

const App = () => {
  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <Switch>
        <Route path="/join" component={Join} />
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  body{
    width: 100%;
    height: 100%;
  }
`;


export default App;
