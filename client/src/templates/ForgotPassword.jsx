import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCheckAllowToResetPassword } from "../slice/checkAllowToResetPasswordSlice";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [isEmailSubmitProcess, setIsEmailSubmitProcess] = useState(false);
  const [isOTPSubmitProcess, setIsOTPSubmitProcess] = useState(false);
  const [isOTPexpired, setIsOTPexpired] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleEmail(e) {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value) || value.length == 0) setEmailValidationError("");
    else setEmailValidationError("Enter valid email");
    setEmail(value);
  }
  function handleFormSubmit(e) {
    !isEmailSubmitProcess
      ? handleEmailSubmit(e)
      : !isOTPSubmitProcess
      ? handleOTPsubmit(e)
      : null;
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    if (emailValidationError.length === 0) {
      setIsEmailSubmitProcess(true);
      setIsOTPexpired(false);
      setOTP("");
      setIsOTPSubmitProcess(false);
      const resetLoading = toast.loading("Processing you're request...", {
        theme: "dark",
      });
      axios
        .post(import.meta.env.VITE_SERVER_API_URL + "/rest-password-request", {
          email,
        })
        .then((res) =>
          toast.update(resetLoading, {
            render: res.data.message,
            type: "success",
            isLoading: false,
            autoClose: 1000,
          })
        )
        .catch((err) =>
          toast.update(resetLoading, {
            render: err.response.data.message,
            type: "error",
            isLoading: false,
            autoClose: 1500,
          })
        );
    } else {
      e.preventDefault();
      toast.warning("Enter valid Email", { autoClose: 1500 });
    }
  }

  function handleOTP(e) {
    const value = e.target.value;
    const charCode = value.charCodeAt(value.length - 1);
    if (value.length == 0) setOTP("");
    else if (charCode > 47 && charCode < 58 && value.length < 7) {
      setOTP(value);
    }
  }

  function handleOTPsubmit(e) {
    e.preventDefault();
    if (OTP.length == 6) {
      setIsOTPSubmitProcess(true);
      const resetLoading = toast.loading("Verifying OTP...", {
        theme: "dark",
      });
      axios
        .post(
          import.meta.env.VITE_SERVER_API_URL + "/reset-password-verfy-otp",
          {
            email,
            OTP,
          }
        )
        .then((res) => {
          toast.update(resetLoading, {
            render: res.data.message,
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          dispatch(setCheckAllowToResetPassword());
          navigate("/reset-new-password", { state: { email } });
        })
        .catch((err) => {
          e.preventDefault();
          toast.update(resetLoading, {
            render: err.response.data.message,
            type: "error",
            isLoading: false,
            autoClose: 1500,
          });

          if (err.response.data?.expired) {
            setIsOTPexpired(true);
            setIsEmailSubmitProcess(false);
          } else {
            setIsOTPSubmitProcess(false);
            setOTP("");
          }
        });
    } else {
      e.preventDefault();
      toast.warning("Enter 6 digit OTP", { autoClose: 1500 });
    }
  }

  return (
    <div
      className="container-md d-flex justify-content-center align-items-center"
      style={{
        height: "720px",
      }}
    >
      <div className="login p-4 d-flex rounded flex-column">
        <h2 className="mb-4">Forgot Password</h2>
        <form onSubmit={handleFormSubmit} method="POST">
          <div
            className="mb-3 form-group"
            style={{
              pointerEvents: `${isEmailSubmitProcess ? "none" : "all"}`,
            }}
          >
            <label htmlFor="email" className="form-label">
              EMAIL
            </label>
            <input
              required
              type="email"
              onChange={handleEmail}
              name="email"
              id="email"
              className="form-control"
              value={email}
            />
            <span className="text-danger ps-2" style={{ fontSize: "10px" }}>
              {emailValidationError}
            </span>
          </div>
          <div
            className={`mb-3 form-group ${
              isEmailSubmitProcess ? "d-block" : "d-none"
            }`}
          >
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
            <input
              required={isEmailSubmitProcess}
              type="text"
              onChange={handleOTP}
              name="otp"
              id="otp"
              className="form-control"
              value={OTP}
            />
            <span className="text-danger ps-2" style={{ fontSize: "10px" }}>
              {emailValidationError}
            </span>
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <Link to={"/login"}>
              <button className="btn border-success rounded px-3">
                Cancel
              </button>
            </Link>
            <button type="submit" className="btn bg-parrot-green rounded px-4">
              {isOTPexpired ? "Resend" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
