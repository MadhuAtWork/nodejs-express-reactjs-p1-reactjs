import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

function Login() {
  const [captchaImg, setCaptchaImg] = useState();
  const [inputData, setInput] = useState({});
  const [getData, setGetData] = useState();

  const onhandleEvent = (e, field) => {
    setInput((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const Navigate = useNavigate();
  const handleSubmitBtn = () => {
    const data = {
      username: inputData?.username,
      password: inputData?.password,
      captcha: inputData?.captcha,
    };

    fetch("http://192.168.0.153:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        Navigate("/index", { state: data?.data });
        // HandlegetData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function CaptchaImg() {
    fetch("http://192.168.0.153:5000/captcha", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCaptchaImg(data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function HandlegetData() {
    fetch("http://192.168.0.153:5000/getDbDataApi", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGetData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    CaptchaImg();
    HandlegetData();
  }, []);

  const handleCaptcha = () => {
    CaptchaImg();
  };

  function handleOtpSend() {
    const data = {
      email: inputData.email,
    };

    fetch("http://192.168.0.153:5000/otpSend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        HandlegetData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleOtpVerify() {
    const data = {
      email: inputData?.email,
      otp: inputData?.otp,
    };

    fetch("http://192.168.0.153:5000/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        HandlegetData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const [disable, setDisable] = useState(true);

  const handleDisableFeild = () => {
    setDisable(false);
  };
  const handleMouseout = () => {
    setDisable(true);
  };
  return (
    <div className="mainDiv">
      <div className="App">
        <div className="main">
          <div className="inputmainDiv">
            <div>
              <h1>Login :</h1>
            </div>
            <div className="loginMainmainDiv">
              <div className="loginDiv">
                <div className="inputDiv">
                  <div>
                    <label>User Name:</label>
                  </div>
                  <div className="input">
                    <input
                      className="input"
                      onChange={(e) => onhandleEvent(e, "username")}
                      value={inputData.username}
                    />
                  </div>
                </div>
                <div className="inputDiv">
                  <div>
                    <label>Passwoprd:</label>
                  </div>
                  <input
                    className="input"
                    onChange={(e) => onhandleEvent(e, "password")}
                    value={inputData.password}
                  />
                </div>
                <div className="inputDiv">
                  <div>
                    <label>Email:</label>
                  </div>
                  <input
                    className="input"
                    onChange={(e) => onhandleEvent(e, "email")}
                    value={inputData.email}
                  />
                </div>

                <div id="captcha" className="inputDiv">
                  <img
                    src={`data:image/svg+xml;base64,${captchaImg?.img}`}
                    alt="captcha"
                  />
                  <button id="submitBtnPost" onClick={handleCaptcha}>
                    Refersh Captcha
                  </button>
                  <br></br>
                  <div>
                    <label>Captcha:</label>
                  </div>
                  <div>
                    <input
                      id="captchaVlaue"
                      className="input"
                      onChange={(e) => onhandleEvent(e, "captcha")}
                      value={inputData.captcha}
                    />
                  </div>

                  <button id="submitBtnPost" onClick={handleSubmitBtn}>
                    Login
                  </button>
                </div>
                <br></br>
              </div>
            </div>
          </div>
        </div>
        <div
          className="liginImg"
          onMouseOver={handleDisableFeild}
          onMouseOut={handleMouseout}
        >
          <div className="inputmainDiv">
            <div>
              <h1>Two Factor Authentication :</h1>
            </div>
            {disable ? (
              <div className="loginMainmainDiv">
                <div className="loginDiv">
                  <div className="inputDiv">
                    <div>
                      <label>Enter Email:</label>
                    </div>
                    <div className="input">
                      <input
                        className="input"
                        onChange={(e) => onhandleEvent(e, "email")}
                        value={inputData.email}
                      />
                    </div>
                    <button id="submitBtnPost" onClick={handleOtpSend}>
                      send Otp
                    </button>
                  </div>

                  <div className="inputDiv">
                    <div>
                      <label>Enter OTP:</label>
                    </div>
                    <div>
                      <input
                        className="input"
                        onChange={(e) => onhandleEvent(e, "otp")}
                        value={inputData.otp}
                      />
                    </div>
                    <br></br>
                    <button id="submitBtnPost" onClick={handleOtpVerify}>
                      verify Otp
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* <div className="tableDiv">
        <Table getData={getData}></Table>
      </div> */}
    </div>
  );
}

export default Login;
