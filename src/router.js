import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./header/Header";
import LeftBar from "./leftbar/LeftBar";
import Today from "./today/TodayContainer";

const HomeRouter = ({ match }) => {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <Route path={`${match.path}/today`} component={Today} />
      </div>
      {/* <Redirect path="*" to="/today" /> */}
    </>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomeRouter} />
        <Redirect path="*" to="/home" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
