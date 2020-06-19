import React from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

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
import MyDetailPage from "./pages/MyDetailPage";
import EditDetailPage from "./pages/EditDetailPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminSearchPage from "./pages/AdminSearchPage";

@inject("colorStore")
@observer
class App extends React.Component {
  render() {
    return (
      <Div>
        <GlobalStyle></GlobalStyle>

        {window.sessionStorage.getItem("uid") === 35 ? (
          <Switch>
            <Route path="/map" component={MapPage} />
            <Route path="/feed" component={FeedPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/write" component={WritePage} />
            <Route path="/match" component={MatchingPage} />
            <Route path="/more" component={MorePage} />
            <Route path="/editP" component={EditProPage} />
            <Route path="/detail/:sid" component={DetailPage} />
            <Route path="/result/:fid" component={MatchingResultPage} />
            <Route path="/mydetail/:pid" component={MyDetailPage} />
            <Route path="/editdetail/:pid" component={EditDetailPage} />
            <Route path="/adminR/:urid" component={AdminRegisterPage} />
            <Route path="/adminS" component={AdminSearchPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        ) : (
          <Div>
            {window.sessionStorage.getItem("uid") === null ? (
              <Switch>
                <Route path="/findpw" component={FindPWPage} />
                <Route path="/join" component={JoinPage} />
                <Route path="/" component={LoginPage} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/map" component={MapPage} />
                <Route path="/feed" component={FeedPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/write" component={WritePage} />
                <Route path="/match" component={MatchingPage} />
                <Route path="/more" component={MorePage} />
                <Route path="/editP" component={EditProPage} />
                <Route path="/detail/:sid" component={DetailPage} />
                <Route path="/result/:fid" component={MatchingResultPage} />
                <Route path="/mydetail/:pid" component={MyDetailPage} />
                <Route path="/editdetail/:pid" component={EditDetailPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            )}
            ;
          </Div>
        )}
      </Div>
    );
  }
}

const GlobalStyle = createGlobalStyle`

  body{
    width: 100%;
    height: 100%;
    
  }
`;
const Div = styled.div``;

export default App;
