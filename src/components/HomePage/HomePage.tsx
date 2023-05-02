import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homePage.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetLoginDetails } from "../../app/userData/loginSlice";
import {
  setRechargeStatus,
  setPhoneNumber,
} from "../../app/userData/rechargeBalance";
import {
  rechargeBalancePost,
  setAmount,
  setFacePayId,
} from "../../app/userData/rechargeBalance";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const loginStore = useAppSelector((state) => state.loginDetailsReducer);

  const registerStore = useAppSelector((state) => state.registerDetailsReducer);

  const rechargeStore = useAppSelector((state) => state.rechargeBalanceReducer);
  const dispatch = useAppDispatch();
  const [wallet, setWallet] = useState<string>("unhide");
  const [bank, setBank] = useState<string>("hide");
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(resetLoginDetails());
  }

  function walletSwitch() {
    setWallet("unhide");
    setBank("hide");
  }

  function bankSwitch() {
    setWallet("hide");
    setBank("unhide");
  }

  function handleWalletTransfer(event: any) {
    event.preventDefault();
    const postRechargeBody = {
      phone: rechargeStore.phoneNumber,
      userID: rechargeStore.facePayId,
      amount: rechargeStore.amount,
    };
    console.log(postRechargeBody);
    dispatch(rechargeBalancePost(postRechargeBody));
  }
  useEffect(() => {
    if (rechargeStore.rechargeStatus === "reject") {
      swal(
        "Unsuccessfully recharge",
        "Enter valid details for recharge",
        "error"
      ).then((reply) => {
        if (reply) {
          navigate("/");
        }
      });
    } else if (rechargeStore.rechargeStatus === "done") {
      console.log("bscbsd");
      navigate("/payment");
    }
  }, [navigate, rechargeStore.rechargeStatus]);
  return (
    <div>
      <form action="" onSubmit={handleWalletTransfer}>
        <header>
          <Link to="/" className="logo">
            <img className="logo-img" src="./images/logo.png" alt="logo" />
          </Link>

          {registerStore.registerStatus === "" && (
            <Link id="signup" className="signup-className" to="/register">
              Sign Up
            </Link>
          )}

          {loginStore.loginStatus === "" && (
            <Link id="login" className="login-className" to="/login">
              Log In
            </Link>
          )}

          {loginStore.loginStatus === "done" && (
            <Link
              id="login"
              className="login-className"
              to="/"
              onClick={handleLogout}
            >
              Log out
            </Link>
          )}
          {loginStore.loginStatus === "done" && (
            <Link id="profile" className="profile-class" to="/profile">
              <img
                className="profile-logo"
                id="profileLogo"
                src="./images/profileM.jpg"
                alt="profile"
              />
            </Link>
          )}
        </header>

        <main>
          <div id="main" className="main-container">
            <div className="welcome-container">
              <p className="welcome-text0">Welcome to FacePay!</p>
              <p className="welcome-text">
                Forgot PIN, Password? Do Not Worry!
              </p>
              <p className="welcome-text">
                Just select the service and pay using face authentication. Yes!
                it's that simple.
              </p>
            </div>

            <div className="transaction-type-container">
              <ul className="transaction-type">
                <li>
                  <span id="wallet-switch" onClick={walletSwitch}>
                    Wallet Transfer
                  </span>
                </li>
                <li>
                  <span id="bank-switch" onClick={bankSwitch}>
                    Bank Transfer
                  </span>
                </li>
              </ul>
            </div>

            <div className="transaction-container">
              <div id="wallet-transfer-container" className={wallet}>
                <div id="wallet-transfer" className="transfer-type">
                  <p className="transfer-title">Wallet Transfer</p>
                  <div className="transfer-detail">
                    <div className="transfer-form wallet-form">
                      <span className="box-title">Mobile Number</span>
                      <input
                        className="box-input"
                        type="text"
                        placeholder="Enter Mobile Number"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        title="enter valid phone number"
                        onChange={(event) =>
                          dispatch(setPhoneNumber(event.target.value))
                        }
                      />
                    </div>
                    <div className="transfer-form wallet-form">
                      <span className="box-title">FacePay-ID</span>
                      <input
                        className="box-input"
                        type="text"
                        placeholder="FacePay-ID"
                        required
                        title="Enter valid face pay id"
                        onChange={(event) =>
                          dispatch(setFacePayId(event.target.value))
                        }
                      />
                    </div>
                    <div className="transfer-form wallet-form last-form-input-wallet">
                      <span className="box-title">Amount</span>
                      <input
                        className="box-input"
                        type="number"
                        placeholder="Enter Amount"
                        required
                        onChange={(event) =>
                          dispatch(setAmount(event.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="imgBx">
                  <img src="./images/wallet.jpg" alt="wallet-img" />
                </div>
              </div>

              <div id="bank-transfer-container" className={bank}>
                <div className="imgBx">
                  <img src="./images/bank.jpg" alt="bank-img" />
                </div>
                <div id="bank-transfer" className="transfer-type">
                  <p className="transfer-title">Bank Transfer</p>
                  <div className="transfer-detail">
                    <div className="transfer-form bank-form">
                      <span className="box-title">Beneficiary Name</span>
                      <input
                        className="box-input"
                        type="text"
                        placeholder="Name on Bank Account"
                      />
                    </div>
                    <div className="transfer-form bank-form">
                      <span className="box-title">Account Number</span>
                      <input
                        className="box-input"
                        type="text"
                        placeholder="Account Number"
                      />
                    </div>
                    <div className="transfer-form bank-form">
                      <span className="box-title">IFSC Code</span>
                      <input
                        className="box-input"
                        type="text"
                        placeholder="IFSC Code"
                      />
                    </div>
                    <div className="transfer-form bank-form last-form-input-bank">
                      <span className="box-title">Amount</span>
                      <input
                        className="box-input"
                        type="text"
                        placeholder="Enter Amount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer id="footer">
          <div className="submit-container">
            <button id="home-next-btn" className="submit-btn" type="submit">
              Next
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default HomePage;
