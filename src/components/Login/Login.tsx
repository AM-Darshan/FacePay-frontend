import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loginDetails,
  resetLoginDetails,
  setLoginEmail,
  setLoginPassword,
} from "../../app/userData/loginSlice";
import swal from "sweetalert";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginStore = useAppSelector((state) => state.loginDetailsReducer);
  function handleLoginSubmit(event: any) {
    event.preventDefault();
    dispatch(
      loginDetails({
        email: loginStore.loginEmail,
        password: loginStore.loginPassword,
      })
    );
  }

  useEffect(() => {
    if (loginStore.loginStatus === "done") {
      swal("Login In successful", "", "success");
      navigate("/");
    } 
    else if(loginStore.loginStatus === "reject"){
      dispatch(resetLoginDetails());
      swal("Login unsuccessful", "Email or Password is invalid!", "warning");
    }
  });
  return (
    <div>
      <header id="header">
        <Link to="/">
          <img className="logo-img" src="./images/logo.png" alt="logo" />
        </Link>
      </header>

      <main>
        <div className="section-container">
          <div className="imgBx">
            <img src="./images/loginF.jpg" alt="login" />
          </div>

          <div className="mb-5">
            <h3 className="mb-3">Welcome Back!</h3>
            <form action="" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                placeholder="Email"
                id="emailInp"
                className="form-control mb-3 topper"
                title="enter valid email"
                required
                onChange={(event) =>
                  dispatch(setLoginEmail(event.target.value))
                }
              />
              <input
                type="password"
                placeholder="Password"
                id="passInp"
                className="form-control mb-3"
                minLength={5}
                required
                onChange={(event) =>
                  dispatch(setLoginPassword(event.target.value))
                }
              />
              <button
                id="submitBtn"
                className="btn w-100 btn-outline-primary mb-3"
              >
                Log In
              </button>
            </form>
            <div className="ask-account">
              Don't have an account?
              <Link to={"/register"}>Sign Up</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
