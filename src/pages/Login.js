import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  FloatingLabel,
  Container,
  Col,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/makeitevent.png";
import useAuth from "../auth/useAuth";
import { setSession, setToken } from "../user/session";
import GoogleLogin from "react-google-login";
import config from "../config";

export default function Login() {
  const usernameLocal = JSON.parse(localStorage.getItem("remember"));
  const navigate = useNavigate();
  const auth = useAuth();
  const [username, setUsername] = useState(() => usernameLocal || "");
  const [password, setPassword] = useState();
  const [data, setData] = useState({});
  const [alert, setAlert] = useState();
  const [check, setCheck] = useState();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCheckbox = (e) => {
    setCheck(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const newUserLogin = {
      username: username,
      pwd: password,
    };

    check === "on" &&
      localStorage.setItem("remember", JSON.stringify(username));

    axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/v1/users/login`,
        newUserLogin
      )
      .then(({ data }) => {
        if (data.error) {
          setData(data);
          setAlert(data.error);
        } else {
          auth.login(data.id, data.username, data.email);
          const user = {
            id: data.id,
            username: data.username,
            email: data.email,
          };
          setToken(data.token);
          setSession(JSON.stringify(user));
          navigate("/");
        }
      });
  };

  const responseGoogle = (response) => {
    const newUserLogin = {
      username: response.profileObj.name,
      pwd: response.googleId,
    };

    check === "on" &&
      localStorage.setItem("remember", JSON.stringify(username));

    axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/v1/users/login`,
        newUserLogin
      )
      .then(({ data }) => {
        if (data.error) {
          setData(data);
          setAlert(data.error);
        } else {
          auth.login(data.id, data.username, data.email);
          const user = {
            id: data.id,
            username: data.username,
            email: data.email,
          };
          setToken(data.token);
          setSession(JSON.stringify(user));
          navigate("/");
        }
      });
  };

  const responseErrorGoogle = (response) => {
    setAlert(true);
    setData({ message: "La validación de Google no fue correcta." });
  };

  return (
    <Container className="auth-wrapper">
      <div className="auth-inner">
        {/* <p> {data.error} </p> */}
        {alert && (
          <Alert
            variant="danger"
            onClose={() => {
              setAlert(false);
            }}
            dismissible
          >
            <p>{data.message}</p>
          </Alert>
        )}
        <Form
          onSubmit={handleForm}
          className="justify-content-center text-center"
        >
          <img alt="logo" src={Logo} className="w-50" />
          <Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="username"
              className="my-3"
            >
              <Form.Control
                type="name"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                data-test-id="username-login-form"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              controlId="floatingPassword"
              label="password"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                data-test-id="password-login-form"
              />
            </FloatingLabel>
          </Form.Group>
          <div className="my-3">
            <Col
              className="text-decoration-none text-secondary"
              as={Link}
              to="/signup"
            >
              Regístrate
            </Col>
            <br />
          </div>
          <Button
            variant="primary"
            type="submit"
            className="my-4"
            size="lg"
            id="button-login-form"
          >
            Iniciar sesión
          </Button>
        </Form>
       {/*  <div className="mb-3 d-flex justify-content-center">
          <GoogleLogin
            clientId={config.GOOGLE_LOGIN}
            buttonText="Inicia con Google"
            onSuccess={responseGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div> */}
        <Form.Group
          className="mb-3 d-flex justify-content-center"
          id="formGridCheckbox"
        >
          <Form.Check
            type="checkbox"
            label="Recuerdame"
            onChange={handleCheckbox}
            check={check}
          />
        </Form.Group>
      </div>
    </Container>
  );
}
