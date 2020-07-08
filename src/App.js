import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./component/Navbar/NavBar";
import Banner from "./component/Banner/Banner";
import ExpList from "./component/Experience/ExpList";
import Footer from "./component/Footer/Footer";
import FilterTag from "./component/FilterTag/FilterTag";
import ExperiencePage from "./component/ExperiencePage/ExperiencePage";
import SingleExp from "./component/SingleExp/SingleExp";
import CreateExp from "./component/CreateExp/CreateExp";
import UpdateExp from "./component/UpdateExp/UpdateExp";
import LoginPage from "./component/LoginPage";
import ProfilePage from "./component/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Button, Modal, Form } from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

function App() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loginFacebook = async (data) => {
    if (data && data.accessToken) {
      console.log(data.accessToken);
      const res = await fetch(
        `https://localhost:5000/auth/login/facebook?token=${data.accessToken}`
      );
      if (res.ok) {
        const dt = await res.json();
        console.log(dt);
        const user = dt.data;
        const token = dt.token;
        setUser(user);
        localStorage.setItem("token", dt.token);
      } else {
        console.log(res);
      }
    }
  };

  const loginGoogle = async (data) => {
     if (data && data.accessToken) {
      console.log(data.accessToken);
      let token = data.accessToken
      const res = await fetch(
        `https://localhost:5000/auth/login/google?token=${token}`
      );
      if (res.ok) {
        const dt = await res.json();
        console.log(dt);
        const user = dt.data;
        let token = dt.token;
        setUser(user);
        localStorage.setItem("token", dt.token);
      } else {
        console.log(res);
      }
    }
  };

  const loginEmail = async (event) => {
    event.preventDefault();
    if (email && password) {
      console.log(email, password);
      let loginData = { email: email, password: password };
      await axios
        .post("https://localhost:5000/auth/login/", loginData)
        .then((res) => {
          console.log(res);
          console.log("This is the data here", res.data.data);
          const user = res.data.data.user;
          const token = res.data.data.token;
          console.log(user);
          console.log(token);
          setUser(user);
          localStorage.setItem("token", token);
        })
        .catch((err) => console.log(err));
    }
  };

  const logOut = async () => {
    const res = await fetch(`https://localhost:5000/auth/logout`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      localStorage.removeItem("token");
      setUser(null);
    } else {
      console.log("You are messing with my code somehow");
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setLoaded(true);
    }
    const res = await fetch(`https://localhost:5000/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const dt = await res.json();
      setUser(dt.data);
    } else {
      localStorage.removeItem("token");
    }
    setLoaded(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUser();
  }, []);

  if (!loaded) return <h1>Loading...</h1>;
  else
    return (
      <Router>
        <>
          <Modal show={show} onHide={handleClose}>
            <h3> Login with Email </h3>
            <Form onSubmit={loginEmail}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <h3> Login with Facebook </h3>
            <FacebookLogin
              appId="1751990751605847"
              autoLoad={false}
              fields="name,email,picture"
              callback={loginFacebook}
            />
            <h3> Login with Google</h3>
            <GoogleLogin
              clientId="208444202424-l087ammsaiv65o248gubddi1c02sqbpo.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={loginGoogle}
              onFailure={loginGoogle}
              cookiePolicy={"single_host_origin"}
            />
            ,
          </Modal>
          <NavBar user={user} handleShow={handleShow} logOut={logOut}></NavBar>
          <Switch>
            <Route exact path="/" component={ExperiencePage}></Route>
            <Route exact path="/login" component={LoginPage}></Route>
            <ProtectedRoute
              user={user}
              exact
              path="/profile"
              component={ProfilePage}
            ></ProtectedRoute>
            <Route
              exact
              path="/experiences/create"
              component={CreateExp}
            ></Route>
            <Route
              exact
              path="/experiences/:expId"
              component={SingleExp}
            ></Route>
            <Route
              exact
              path="/experiences/:expId/update"
              component={UpdateExp}
            ></Route>
          </Switch>
          <Footer></Footer>
        </>
      </Router>
    );
}

export default App;
