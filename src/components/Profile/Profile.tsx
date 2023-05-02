import React, { useEffect, useState } from "react";
import "./profile.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProfileDetails } from "../../app/userData/profileDetails";

const Profile = () => {
  const profileStore = useAppSelector((state) => state.profileDetailsReducer);
  const loginStore = useAppSelector((state) => state.loginDetailsReducer);
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState("./images/profileM.jpg");
  const [uploadText, setUploadText] = useState("Upload Status");
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(true);
  const handlePhotoChange = (event: any) => {
    setPhoto(URL.createObjectURL(event.target.files[0]));
    setUploadText("Photo uploaded successfully!");
  };

  useEffect(() => {
    if (loginStore.loginEmail !== "") {
      dispatch(getProfileDetails(loginStore.loginEmail));
    }
  }, [loginStore.loginEmail]);

  const handleSaveButton = () => {
    setIsSaveButtonVisible(false);
    swal("Success", "Your profile has been updated!", "success");
  };
  return (
    <div>
      <header id="header">
        <Link to="/">
          <img className="logo-img" src="./images/logo.png" alt="logo" />
        </Link>
      </header>

      <div className="message-container">
        <p id="upload-text" className="hide">
          {uploadText}
        </p>
      </div>

      <main>
        <div className="profile-card">
          <div className="left-container">
            <div className="photo-container">
              <img id="photo" src={photo} alt="profile" />
              <input
                id="file"
                type="file"
                onChange={handlePhotoChange}
                accept="image/*"
              />
              <label id="uploadBtn" htmlFor="file">
                Upload Photo
              </label>
            </div>
          </div>

          <div className="right-container">
            {/* {profileStore.facePayID === "" && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )} */}
            <div id="profile-details" className="profile-container">
              <p className="profile-text-title">
                Name:{" "}
                <span id="name" className="profile-text">
                  {profileStore.name}
                </span>
              </p>
              <p className="profile-text-title">
                Email:{" "}
                <span id="email" className="profile-text">
                  {profileStore.email}
                </span>
              </p>
              <p className="profile-text-title">
                Username:{" "}
                <span id="username" className="profile-text">
                  {profileStore.username}
                </span>
              </p>
              <p className="profile-text-title">
                Mobile:{" "}
                <span id="phone" className="profile-text">
                  {profileStore.mobile}
                </span>
              </p>
              <p className="profile-text-title">
                FacePay ID:{" "}
                <span id="payid" className="profile-text">
                  {profileStore.facePayID}
                </span>
              </p>
              <p className="profile-text-title">
                Balance:{" "}
                <span id="balance" className="profile-text">
                  {profileStore.balance}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer id="footer">
        <div className="save-container">
          {isSaveButtonVisible && (
            <button
              id="save-btn"
              className="save-btn unhide"
              onClick={handleSaveButton}
            >
              Save
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Profile;
