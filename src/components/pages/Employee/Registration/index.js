import React, { useState, useContext } from "react";
import "./Registration.css";
import Header from "../../Header/Header";
import Upload from "./Upload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Multistepcontext } from '../../../../StepContext';
import { useHistory } from "react-router-dom";
import { emailValidator } from '../../../../Utils/fieldValidator'

const ExampleCustomInput = ({ value, onClick }) => {
  return (
    <div>
      <input
        type="text"
        id="lname"
        className="example-custom-input"
        onClick={(e) => onClick(e.preventDefault())}
        value={value}
        style={{
          backgroundImage: "url(images/calendar.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          backgroundOrigin: "content-box",
          padding: "10px",
        }}
      />
    </div>
  );
};
function Registration() {
  const [startDate, setStartDate] = useState(new Date());
  const [phoneNO, setPhoneNO] = useState();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    designation: "",
    role: "",
    manager: "",
    screenshot:""
  });
  const [showError, setShowError] = useState(false)
  const { page, backpackClick, userData, currentStep, setUserData, setFinalData, setCurrentStep } = useContext(Multistepcontext)
  const history = useHistory();
  const routeChange = () => {
    let path = `./Employee`;
    history.push(path);
  }
  const ytnStyle = {
    backgroundColor: "blue",
    backgroundImage: "linear-gradient(45deg, black, transparent)",
  };

  const handleValueChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    setShowError(true)
    if (details.name && details.designation && emailValidator(details.email) && details.role && details.manager && details.screenshot) {
      setCurrentStep(2); backpackClick(2)
    }
  }

  return (
    <div>
      {/* <Header headerName="Registration" /> */}
      <div class="upload-image" style={{ display: "flex", marginLeft: "8%", marginTop: "5%" }}>
        <div className="uploadImage"
          style={{
            backgroundColor: "#f1f1f1",
          }}
        >
          <Upload />
        </div>
      </div>
      <div class="container">
        <form class="registrstion-form">
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Name
              </label>
              <input
                style={{ border: showError ? details.name.length === 0 ? " 1px solid red" : null : null }}
                type="text"
                id="fname"
                name="name"
                placeholder="Name"
                value={details.name}
                onChange={e => handleValueChange(e)}
              />
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Email
              </label>
              <input
                style={{ border: showError ? !emailValidator(details.email) ? " 1px solid red" : null : null }}
                type="text"
                id="lname"
                name="email"
                placeholder="Email"
                value={details.email}
                onChange={e => handleValueChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Mobile Number
              </label>
              <PhoneInput
                country={"us"}
                value={phoneNO}
                onChange={(value) => setPhoneNO(value)}
              />
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Date of Birth{" "}
                <i class="fas fa-calendar-week" style={{ color: "black" }} />
              </label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={<ExampleCustomInput />}
              />
              {/* 
                    </DatePicker> */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Designation
              </label>

              <select
                style={{ border: showError ? details.designation.length === 0 ? " 1px solid red" : null : null }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="designation"
                value={details.designation}
                onChange={e => handleValueChange(e)}
              >
                <option selected>Choose Designation</option>
                <option value="1">Developer</option>
                <option value="2">Tester</option>
                <option value="3">Designer</option>
              </select>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Role
              </label>

              <select
                style={{ border: showError ? details.role.length === 0 ? " 1px solid red" : null : null }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="role"
                value={details.role}
                onChange={e => handleValueChange(e)}
              >
                <option selected>Choose Role</option>
                <option value="1">Lead</option>
                <option value="2">QA Lead</option>
                <option value="3">Fresher</option>
              </select>
            </div>
          </div>
          <div className="row">
            <label
              class="form-check-label reg-lable"
              for="exampleCheck1"
              style={{
                fontSize: "25px",
                fontWeight: "700",
                marginLeft: "1%",
                marginTop: "1%",
              }}
            >
              Advance Setting
            </label>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Manager
              </label>

              <select
                style={{ border: showError ? details.manager.length === 0 ? " 1px solid red" : null : null }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="manager"
                value={details.manager}
                onChange={e => handleValueChange(e)}
              >
                <option selected>Choose Manager</option>
                <option value="1">Manager</option>
                <option value="2">Assistant Manager</option>
                <option value="3">Juniar Manager</option>
              </select>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Screenshot Recurrence(in Min)
              </label>
              <select
                style={{ border: showError ? details.screenshot.length === 0 ? " 1px solid red" : null : null }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="screenshot"
                value={details.screenshot}
                onChange={e => handleValueChange(e)}
              >
                <option selected>Choose ScreenShot</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </form>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button className="btn  float-left" type="submit" onClick={routeChange}>
              Cancel
            </button>
            <button onClick={() => handleNext()} className="btn  float-left" type="submit" style={{ backgroundColor: "#25344b" }}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
