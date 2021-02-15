import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./header/Header";
import LeftBar from "./leftbar/LeftBar";
import LoginPage from "./login_page/container/loginContainer";
import Today from "./today/container/TodayContainer";

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
        <Route path="/login" component={LoginPage} />
        <Redirect path="*" to="/home" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
