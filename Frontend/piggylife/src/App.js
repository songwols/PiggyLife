import React from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import WritePage from "./pages/WritePage";
import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import MapPage from "./pages/MapPage";
import MatchingPage from "./pages/MatchingPage";
import FindPWPage from "./pages/FindPWPage";
import MorePage from "./pages/MorePage";
import EditProPage from "./pages/EditProPage";
import DetailPage from "./pages/DetailPage";
import MatchingResultPage from "./pages/MatchingResultPage";

const App = () => {
  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <Switch>
        <Route path="/map" component={MapPage} />
        <Route path="/feed" component={FeedPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/join" component={JoinPage} />
        <Route path="/write" component={WritePage} />
        <Route path="/match" component={MatchingPage} />
        <Route path="/findpw" component={FindPWPage} />
        <Route path="/more" component={MorePage} />
        <Route path="/editP" component={EditProPage} />
        <Route path="/detail" component={DetailPage} />
        <Route path="/result" component={MatchingResultPage} />
        <Route path="/" component={LoginPage} />
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
