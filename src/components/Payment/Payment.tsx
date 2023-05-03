import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import "./payment.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setRechargeStatus } from "../../app/userData/rechargeBalance";
import { resetLoginDetails } from "../../app/userData/loginSlice";
import { resetRegisterDetails } from "../../app/userData/registerSlice";
import { resetProfileData } from "../../app/userData/profileDetails";
const Payment = () => {
  const animationContainer = useRef(null);

  const rechargeBalanceStore = useAppSelector(
    (state) => state.rechargeBalanceReducer
  );

  const balance = useAppSelector(
    (state) => state.profileDetailsReducer.balance
  );

  const total_balance = Number(balance) + Number(rechargeBalanceStore.amount);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (rechargeBalanceStore.rechargeStatus === "done") {
      lottie.loadAnimation({
        container: animationContainer.current!,
        renderer: "svg", // Can be 'svg', 'canvas', 'html'
        loop: true,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
    }
  }, [rechargeBalanceStore.rechargeStatus]);

  function handleHomeClick() {
    dispatch(setRechargeStatus(""));
    dispatch(resetLoginDetails());
    dispatch(resetRegisterDetails());
    dispatch(resetProfileData());
  }
  return (
    <div>
      <header id="header">
        <Link className="logo" to="/">
          <img className="logo-img" src="./images/logo.png" alt="logo" />
        </Link>
      </header>

      <main id="main">
        <p id="thanks-message" className="message">
          Thank you for using FacePay.
        </p>
        <img
          className="success"
          src="./images/success.gif"
          alt="success-icon"
        />
        <div className="failed hide">
          <script
            defer
            src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          ></script>
          <div
            ref={animationContainer}
            style={{ width: 150, height: 150 }}
          ></div>
        </div>
        <p id="success-message" className="message">
          Success!
        </p>
        <p id="request-message" className="message">
          Your recharge for ₹{rechargeBalanceStore.amount} has been successfully
          processed.
        </p>
        <p id="recharge-message" className="message">
          Account Balance = {total_balance}
        </p>
        <p id="failure-reason" className="message hide">
          Face was not verified successfully.
        </p>
        <p id="redirecting-message" className="message">
          You will be redirected to home page shortly or click 'Home' to return
          to home page.
        </p>
      </main>

      <footer id="footer">
        <div className="submit-container-payment">
          <Link to="/">
            <button
              id="home-btn"
              className="submit-btn-payment"
              onClick={handleHomeClick}
            >
              Home
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Payment;
