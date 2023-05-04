import React, { useEffect } from "react";
import ImageUploader from "./ImageUploader/ImageUploader";
import ImageDisplay from "./ImageDisplay/ImageDisplay";
import "./signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoJS from "crypto-js";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  registerDetails,
  setEmail,
  setFullName,
  setPassword,
  setPhoneNumber,
  setUserName,
} from "../../app/userData/registerSlice";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { userDataImages } from "../../app/userData/imageUploadSlice";

export interface registerUser {
  fullName: string;
  email: string;
  userName: string;
  phone: string;
  password: string;
  balance: number;
}

const Register = () => {
  const navigate = useNavigate();
  const uploadedImages = useAppSelector(
    (state) => state.imageUploadReducer.uploadedImages
  );
  const registerStore = useAppSelector((state) => state.registerDetailsReducer);
  const userImageStore = useAppSelector((state) => state.imageUploadReducer);
  const dispatch = useAppDispatch();
  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();
    let postBody : registerUser = {
      fullName: registerStore.fullName,
      email: registerStore.email,
      userName: registerStore.userName,
      phone: registerStore.phoneNumber,
      password: registerStore.password,
      balance: 10,
    };
    console.log(postBody);
    dispatch(userDataImages({images: uploadedImages,name: registerStore.fullName}));
    dispatch(registerDetails(postBody));
  };

  useEffect(() => {
    if (
      userImageStore.imagestatus === "success" &&
      userImageStore.status === "done"
    ) {
      swal("User Successfully Registered", "", "success").then((reply) => {
        if (reply) {
          navigate("/login");
        }
      });
    }
  }, [navigate, userImageStore.imagestatus, userImageStore.status]);

  return (
    <div>
      {/* <ImageDisplay /> */}
      <header id="header">
        <Link to="/">
          <img className="logo-img" src="./images/logo.png" alt="logo" />
        </Link>
      </header>

      <main>
        <div className="section-container">
          <div className="imgBx">
            <img src="./images/signupM.jpeg" alt="signup" />
          </div>
          {userImageStore.imagestatus === "pending" && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          <div className="mb-5">
            <h3 className="mb-3">Welcome to FacePay!</h3>
            <form action="" onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                id="nameInp"
                className="form-control mb-3 topper"
                minLength={3}
                maxLength={30}
                required
                title="Enter valid name"
                onChange={(event) => dispatch(setFullName(event.target.value))}
              />
              <input
                type="email"
                placeholder="Email"
                id="emailInp"
                className="form-control mb-3"
                title="enter valid email"
                required
                onChange={(event) => dispatch(setEmail(event.target.value))}
              />
              <input
                type="text"
                placeholder="Username"
                id="userInp"
                className="form-control mb-3"
                minLength={3}
                maxLength={30}
                required
                title="Enter valid username name"
                onChange={(event) => dispatch(setUserName(event.target.value))}
              />
              <input
                type="text"
                placeholder="Phone Number"
                id="phoneInp"
                className="form-control mb-3"
                maxLength={10}
                pattern="[0-9]{10}"
                title="enter valid phone number"
                onChange={(event) =>
                  dispatch(setPhoneNumber(event.target.value))
                }
              />
              <input
                type="password"
                placeholder="Password"
                id="passInp"
                className="form-control mb-3"
                minLength={5}
                required
                onChange={(event) => dispatch(setPassword(event.target.value))}
              />
              <ImageUploader />

              <button
                type="submit"
                id="sub_btn"
                className="btn w-100 btn-outline-primary mb-3"
                disabled={userImageStore.status !== "done"}
              >
                Register
              </button>
            </form>

            <div className="ask-account">
              Already have an account!
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
