import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./common/header/Header";
import { headerHeight } from "./common/header/Header.style";
import LeftBar from "./common/leftbar/LeftBar";
import Today from "./today/container/TodayContainer";
// import MemoMain from "./memo/container/MemoMain";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <Switch>
          <Route path="/today" component={Today} />
          <Route path="/month" component={Today} />
          {/* <Route path="/" component={MemoMain} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
