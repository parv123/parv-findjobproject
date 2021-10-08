import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";

//import { Navbar } from 'react-bootstrap';
import Navbar from "./Navbar";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter,
} from "mdbreact";
const p_name = "";
function Login(props) {
  const [person, setPerson] = useState("");
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState("");
  function handleChange(e) {
    setPerson(e.target.value);
  }
  function handleChangeE(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    if (person == "" || email == "") {
      alert("Enter details to proceed");
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      alert("Enter a valid email address");
    } else if (person !== "") {
      props.handleSubmit(person);
      setPerson("");
      setSubmit(true);
    }
    e.preventDefault();
  }
  return (
    <div className="Login">
      {submit == false ? (
        <MDBContainer>
          <MDBRow>
            <MDBCol
              className="mx-auto"
              style={{ maxWidth: "400px", marginBottom: "3cm" }}
            >
              <MDBCard className="form-elegant">
                <MDBCardBody className="mx-2">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Enter Details:</strong>
                    </h3>
                  </div>
                  <div className="input-container">
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      onChange={handleChangeE}
                    ></input>
                  </div>
                  <div className="input-container">
                    <input
                      placeholder="Full Name"
                      type="name"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="text-center mb-3">
                    <button
                      type="button"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a .z-depth-1-half logbtn"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                  <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                    or Submit details with:
                  </p>
                  <div className="row my-3 d-flex justify-content-center">
                    <button
                      type="button"
                      color="white"
                      rounded
                      className="iconbtn"
                    >
                      <MDBIcon
                        fab
                        icon="facebook-f"
                        className="blue-text text-center"
                      />
                    </button>
                    <button
                      type="button"
                      color="white"
                      rounded
                      className="iconbtn"
                    >
                      <MDBIcon fab icon="twitter" className="blue-text" />
                    </button>
                    <button
                      type="button"
                      color="white"
                      rounded
                      className=" iconbtn"
                    >
                      <MDBIcon fab icon="google-plus-g" className="blue-text" />
                    </button>
                  </div>
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  © 2021 Parv Project Inc. All rights reserved.
                </MDBModalFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      ) : (
        <span></span>
      )}
    </div>
  );
}

function Main(props) {
  const [name, setName] = useState(props.name);
  function addName(name) {
    setName(name);
  }
  return (
    <div>
      <Login handleSubmit={addName} />
      {name.length > 0 ? <App name={name} /> : <span></span>}
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Main name={p_name} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function AddPersonForm(props) {
  const [person, setPerson] = useState("");

  function handleChange(e) {
    setPerson(e.target.value);
  }

  function handleSubmit(e) {
    if (person !== "") {
      props.handleSubmit(person);
      setPerson("");
    }
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add task here"
        onChange={handleChange}
        value={person}
      />
      <button className="btn-btn danger" btype="submit">
        Add
      </button>
    </form>
  );
}

function PeopleList(props) {
  const [deletev, setDelete] = useState("");

  const arr = props.data;
  var index = arr.indexOf(deletev);
  if (index > -1) {
    arr.splice(index, 1);
  }
  

  const listItems = arr.map((val, index) => (
    <div>
      <li key={index}>{val}</li>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDelete(val);
        }}
      >
        <button id="button1" key={index} value={val} >
          Delete
        </button>
      </form>
    </div>
  ));
  return <ul>{listItems}</ul>;
}

function ContactManager(props) {
  const [contacts, setContacts] = useState(props.data);

  function addPerson(name) {
    setContacts([...contacts, name]);
  }

  return (
    <div>
      <AddPersonForm handleSubmit={addPerson} />
      <PeopleList data={contacts} />
    </div>
  );
}
const contacts = [];

ReactDOM.render(
  <ContactManager data={contacts} />,
  document.getElementById("root")
);*/
