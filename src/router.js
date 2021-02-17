import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./header/Header";
import LeftBar from "./leftbar/LeftBar";
import Todo from "./todo/TodoContainer";
import Dashboard from "./dashboard/DashboardContainer";

const HomeRouter = ({ match }) => {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <Route path={`${match.path}/todo`} component={Todo} />
        <Route path={`${match.path}/done`} component={Todo} />
        <Route path={`${match.path}/dashboard`} component={Dashboard} />
        <Redirect path="*" to="todo" />
      </div>
    </>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomeRouter} />
        <Redirect path="*" to="/home/todo" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
