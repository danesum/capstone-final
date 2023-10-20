//import needed elements for page
import { React, useState } from "react";
import { Container, Button, Form, Row, Alert } from "react-bootstrap";

function Login({ user, setUser }) {
  // define local state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState("");

  //function for handling logins, checks against user info and returns
  //JWT token which is then set to local storage in App.js
  async function handleLogin(e) {
    e.preventDefault();
    setMessages("");
    try {
      let data = { username: username, password: password };
      let res = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let resObj = await res.json();
      // check if the response is generated properly, else the program
      // tries to continue logging in
      if (resObj.hasOwnProperty("token") && resObj.hasOwnProperty("admin")) {
        setUser({ jwt: resObj.token, auth: true, admin: resObj.admin });
        // clear data out of state for security
        setUsername("");
        setPassword("");
      } else {
        setMessages(resObj.message);
      }
    } catch (err) {
      setMessages(err.message);
      console.log(err.message);
    }
  }

  //function which lets users sign up and adds them to the "user" database
  async function handleSignup(e) {
    e.preventDefault();
    setMessages("");
    try {
      let data = { username: username, password: password };
      let res = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let info = await res.json();
      setMessages(info.message);
      setUsername("");
      setPassword("");
    } catch (err) {
      setMessages(err);
      console.log(err);
    }
  }

  // frontend code for the login section
  return (
    <Container>
      {/* Displays messages at the top of the screen if there is 
      content in the messages state variable */}
      {messages.length > 0 && (
        <Row className="mt-3">
          <Alert key="primary" variant="primary" dismissible>
            {messages}
          </Alert>
        </Row>
      )}
      {/* Page heading */}
      <Container className="border my-3" style={{ maxWidth: "18rem" }}>
        <Row className="py-3 ">
          <h2>Log In or Sign Up</h2>
        </Row>
        {/* Sign in/sign up form */}
        <Row>
          <Form className="mx-auto">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleLogin(e)}
              className="w-100"
            >
              Log In
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSignup(e)}
              className="w-100 my-3"
            >
              Sign Up
            </Button>
          </Form>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;
