import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "../firebase";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isBtnDisable, setIsBtnDisable] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  const handleSendCode = async (event) => {
    event.preventDefault();

    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    await phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((id) => {
        setVerificationId(id);
        setIsBtnDisable(true);
        toast("Verification Code is sent on phone");     
       })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          toast("Too many sign-in attempts. Please try again later.");
        } else {
          console.log(error);
        }
      });
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();

    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    console.log(verificationId, "verifiy");
    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        console.log("User signed in: ", user);
        navigate("/home");
      })
      .catch((error) => {
        // Handle error
        if (error.code === "auth/too-many-requests") {
          alert("Too many sign-in attempts. Please try again later.");
        } else {
          console.log(error);
        }
      });
  };
  const onChange = (e) => {
    setPhoneNumber(e.target.value);
    setIsBtnDisable(false);
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSendCode}>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+923000000000"
            value={phoneNumber}
            onChange={onChange}
            required
          />
        </div>
        <div id="recaptcha-container"></div>
        <button disabled={isBtnDisable} type="submit">
          Send OTP
        </button>
      </form>
      <form onSubmit={handleVerifyCode}>
        <div className="form-group">
          <label htmlFor="code">Verification Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify Code</button>
      </form>
    </div>
  );
};

export default Login;
