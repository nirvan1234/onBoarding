import React,{useState, useEffect} from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/pages/Login";
import ResetPassword from "./components/pages/ResetPassword";
import ChangePassword from "./components/pages/changePassword";
import Navbar from "./components/pages/navbar";
import Error from "./components/pages/error";
import Forgetpassword from "./components/pages/forgotpassword";
import { useSelector } from "react-redux";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/dashboard";
import Employee from "./components/pages/Employee";
import Rolespermission from "./components/pages/Rolespermission";
import Settings from "./components/pages/settings";
import View from "./components/pages/People/View";
import Registration from "./components/pages/Employee/Registration";
import AddRole from "./components/pages/Rolespermission/addRole";
import Documents from "./components/pages/Employee/Registration/Documents";
import Payroll from "./components/pages/Employee/Registration/Payroll";
import JobDetails from "./components/pages/Employee/Registration/JobDetails";
import FirstStepper from "./components/pages/Stepper/Stepper";
import CreateProject from "./components/pages/Project";
import Task from "./components/pages/Project/Task"
import ProjectList from "./components/pages/Project/ProjectList";


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const Routes = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const { isLoggedIn, toggle } = useSelector((store) => store.auth);
  const Location = useLocation()

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const btnStyle = {
    marginLeft: '20%'
  }
  if((windowDimensions.width>=768)  && (windowDimensions.width<=1023)){
    btnStyle.marginLeft = "9%";
  }else if(windowDimensions.width<700){
    btnStyle.marginLeft = "15%";
  }
  if (toggle) {
    btnStyle.marginLeft = '5%'
  }
  return (
    <>
      {/* <Navbar /> */}
      {isLoggedIn ? (
        <div >
          <div> <Navbar /></div>
          {/* <div style={btnStyle}> {Location.pathname}  </div> */}
          <div style={btnStyle}  >
            <Switch>

              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/Employee">
                <Employee />
              </Route>
              <Route path="/Rolespermission">
                <Rolespermission />
              </Route>
              <Route path="/Project">
              <ProjectList />
              </Route>
              <Route path="/ProjectList">
              <CreateProject />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/Registration">
                <Registration />
              </Route>
              <Route path="/AddRole">
                <AddRole />
              </Route>
              <Route path="/Documents">
                <Documents />
              </Route>
              <Route path="/Payroll">
                <Payroll />
              </Route>
              <Route path="/JobDetails">
                <JobDetails />
              </Route>
              <Route path="/AddPeople">
              <FirstStepper />
              </Route>
              <Route path="/Task">
              <Task/>
              </Route>

             
             
              {/* <Route exact path="/">
                <Home />
              </Route> */}
            </Switch>
          </div>
        </div>
      ) : (

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/resetPassword">
            <ResetPassword />
          </Route>
          <Route path="/forgetpassword">
            <Forgetpassword />
          </Route>
          <Route path="/changepassword">
            <ChangePassword />
          </Route>
          <Route path = "/View/:id">
                <View />
                </Route>

          {/* <Route exact path ="/Post/:category" component={Post} />
    <Route component={Error}/ > */}
        </Switch>
      )}
    </>
  );
};

export default Routes;
