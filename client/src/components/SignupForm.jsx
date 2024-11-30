import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [userValues, setUserValues] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [userValueErrors, setUserValueErrors] = useState({
    email: "",
    password: "",
    rePassword: "",
  });
  const [checkPasswordStrength, setCheckPasswordStrength] = useState({
    number: false,
    specialChar: false,
    upperCase: false,
    lowerCase: false,
    otherChar: false,
  });

  const [passwordEye, setPasswordEye] = useState(false);
  const [rePasswordEye, setRePasswordEye] = useState(false);
  const [passwordInfoMouseHover, setPasswordInfoMouseHover] = useState(false);
  const navigate = useNavigate();

  function handleInput(e) {
    const key = e.target.name;
    let value = e.target.value;

    switch (key) {
      case "email":
        const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        if (!regex.test(value) && value.length !== 0) {
          setUserValueErrors((pre) => {
            return { ...pre, email: "e.g., example@gmail.com" };
          });
        } else {
          setUserValueErrors((pre) => {
            return { ...pre, email: "" };
          });
        }
        break;
      case "password":
        if (value.length == 0) {
          setUserValues((pre) => {
            return { ...pre, rePassword: "" };
          });
          setUserValueErrors((pre) => {
            return { ...pre, rePassword: "", password: "" };
          });
        } else if (value.length >= 8 && value.length <= 20) {
          setCheckPasswordStrength({
            number: false,
            specialChar: false,
            upperCase: false,
            lowerCase: false,
            otherChar: false,
          });
          const passwordStreangth = {
            number: false,
            specialChar: false,
            upperCase: false,
            lowerCase: false,
            otherChar: false,
          };
          for (let chr of value) {
            const charCode = chr.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90) {
              setCheckPasswordStrength((pre) => ({ ...pre, upperCase: true }));
              passwordStreangth.upperCase = true;
            } else if (charCode >= 97 && charCode <= 122) {
              setCheckPasswordStrength((pre) => ({ ...pre, lowerCase: true }));
              passwordStreangth.lowerCase = true;
            } else if (charCode >= 48 && charCode <= 57) {
              setCheckPasswordStrength((pre) => ({ ...pre, number: true }));
              passwordStreangth.number = true;
            } else if (
              (charCode >= 35 && charCode <= 38) ||
              charCode == 64 ||
              charCode == 95
            ) {
              setCheckPasswordStrength((pre) => ({
                ...pre,
                specialChar: true,
              }));
              passwordStreangth.specialChar = true;
            } else {
              setCheckPasswordStrength((pre) => ({ ...pre, otherChar: true }));
              passwordStreangth.otherChar = true;
            }
          }
          if (passwordStreangth.otherChar) {
            setPasswordInfoMouseHover(false);
            setUserValueErrors((pre) => {
              return { ...pre, password: "@, #, $, %, &, _ only allowed" };
            });
          } else if (
            passwordStreangth.lowerCase &&
            passwordStreangth.upperCase &&
            passwordStreangth.number &&
            passwordStreangth.specialChar
          ) {
            setPasswordInfoMouseHover(false);
            setUserValueErrors((pre) => {
              return { ...pre, password: "" };
            });
          } else {
            setUserValueErrors((pre) => {
              return { ...pre, password: "Password must be strong" };
            });
          }
        } else if (value.length < 8 || value.length > 20) {
          setCheckPasswordStrength({
            number: false,
            specialChar: false,
            upperCase: false,
            lowerCase: false,
            otherChar: false,
          });
          setPasswordInfoMouseHover(false);
          setUserValueErrors((pre) => {
            return { ...pre, password: "20 >= Password length >= 8" };
          });
        }
        break;
      case "rePassword":
        if (
          !checkPasswordStrength.lowerCase ||
          !checkPasswordStrength.upperCase ||
          !checkPasswordStrength.number ||
          !checkPasswordStrength.specialChar ||
          checkPasswordStrength.otherChar
        ) {
          const passwordInput = document.getElementById("password");
          passwordInput.focus();
          value = "";
          setUserValueErrors((pre) => ({ ...pre, rePassword: "" }));
        } else if (
          key == "rePassword" &&
          userValues.password != value &&
          value.length !== 0
        ) {
          setUserValueErrors((pre) => {
            return { ...pre, rePassword: "Password not matched" };
          });
        } else {
          setUserValueErrors((pre) => {
            return { ...pre, rePassword: "" };
          });
        }
        break;
    }
    // A - Z 65 - 90
    // a - z 97 - 122
    // 0 - 9 48 - 57
    // @-64 &-38 %-37 $-36 #-35

    setUserValues((pre) => {
      return { ...pre, [key]: value };
    });
  }

  function handlePasswordEye(e) {
    setPasswordEye(!passwordEye);
  }
  function handleRePasswordEye(e) {
    setRePasswordEye(!rePasswordEye);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (
      userValueErrors.email.length == 0 &&
      userValueErrors.password.length == 0 &&
      userValueErrors.rePassword.length == 0
    ) {
      const loading = toast.loading("Hang tight, we're working on it!", {
        theme: "dark",
      });
      axios
        .post(import.meta.env.VITE_SERVER_API_URL + "/register", userValues)
        .then((res) => {
          toast.update(loading, {
            render: "Thank you for your submission",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });

          navigate("/login");
        })
        .catch((err) => {
          const error = err.response.data.message;
          toast.update(loading, {
            render: error,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        });
    } else {
      e.preventDefault();
      toast.warning("Incorrect information", { autoClose: 1500 });
    }
  }

  return (
    <div className="signupform">
      <form onSubmit={handleFormSubmit}>
        <div className=" form-group">
          <label htmlFor="username" className="form-label">
            USERNAME
          </label>
          <input
            required
            type="text"
            onChange={handleInput}
            name="userName"
            id="username"
            className="form-control"
            value={userValues.userName}
          />
          <span className="text-danger ps-2" style={{ fontSize: "10px" }}>
            {userValueErrors.userName && "Username can't be empty"}
          </span>
        </div>
        <div className=" form-group">
          <label htmlFor="email" className="form-label">
            EMAIL
          </label>
          <input
            required
            type="email"
            onChange={handleInput}
            name="email"
            id="email"
            className="form-control"
            value={userValues.email}
          />
          <span className="text-danger ps-2" style={{ fontSize: "10px" }}>
            {userValueErrors.email}
          </span>
        </div>
        <div className=" form-group">
          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <div className="password-group">
            <input
              required
              type={passwordEye ? "text" : "password"}
              onChange={handleInput}
              name="password"
              id="password"
              className="form-control pe-5 no-copy"
              value={userValues.password}
              onCopy={(e) => e.preventDefault()}
            />
            {userValues["password"]?.length > 0 && (
              <i
                className={`bi ${
                  passwordEye ? "bi-eye-slash" : "bi-eye"
                } password-eye`}
                onClick={handlePasswordEye}
              ></i>
            )}
          </div>
          <span
            className="text-danger ps-2 password-info"
            style={{ fontSize: "10px", position: "relative" }}
          >
            {userValueErrors.password != "Password must be strong" ? (
              userValueErrors.password
            ) : (
              <span>
                {userValueErrors.password}
                <i
                  className="bi bi-info-circle ps-1"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => {
                    setPasswordInfoMouseHover(true);
                  }}
                  onMouseLeave={() => {
                    setPasswordInfoMouseHover(false);
                  }}
                ></i>
              </span>
            )}
            {passwordInfoMouseHover && (
              <ul
                className="list-unstyled"
                style={{
                  position: "absolute",
                  width: "110px",
                  backgroundColor: "#cefad0",
                  zIndex: 999,
                  padding: "3px 5px",
                  fontSize: "9px",
                  left: "100%",
                  top: "25px",
                  color: "rgb(0,0,0)",
                }}
              >
                <li>
                  <i
                    className={`bi ${
                      checkPasswordStrength.number
                        ? "bi-check-circle text-success"
                        : "bi-x-circle text-danger"
                    }`}
                  ></i>{" "}
                  Number
                </li>
                <li>
                  <i
                    className={`bi ${
                      checkPasswordStrength.upperCase
                        ? "bi-check-circle text-success"
                        : "bi-x-circle text-danger"
                    }`}
                  ></i>{" "}
                  Uppercase
                </li>
                <li>
                  <i
                    className={`bi ${
                      checkPasswordStrength.lowerCase
                        ? "bi-check-circle text-success"
                        : "bi-x-circle text-danger"
                    }`}
                  ></i>{" "}
                  Lowercase
                </li>
                <li>
                  <i
                    className={`bi ${
                      checkPasswordStrength.specialChar
                        ? "bi-check-circle text-success"
                        : "bi-x-circle text-danger"
                    }`}
                  ></i>{" "}
                  Special Character
                </li>
              </ul>
            )}
          </span>
        </div>
        <div className=" form-group">
          <label htmlFor="re-password" className="form-label">
            RE-PASSWORD
          </label>
          <div className="password-group">
            <input
              required
              type={rePasswordEye ? "text" : "password"}
              onChange={handleInput}
              name="rePassword"
              id="re-password"
              className="form-control pe-5"
              value={userValues.rePassword}
            />
            {userValues["rePassword"]?.length > 0 && (
              <i
                className={`bi ${
                  rePasswordEye ? "bi-eye-slash" : "bi-eye"
                } password-eye`}
                onClick={handleRePasswordEye}
              ></i>
            )}
          </div>
          <span className="text-danger ps-2" style={{ fontSize: "10px" }}>
            {userValueErrors.rePassword}
          </span>
        </div>
        <div className="mb-3 d-flex align-items-center ps-2">
          <input type="checkbox" name="" id="" required />
          <label htmlFor="" className="form-label terms-conditions ps-3 pt-2">
            By signing up I agree with{" "}
            <span className="parrot-green">terms and conditions</span>
          </label>
        </div>
        <div className="mb-3">
          <button className="btn bg-parrot-green rounded px-4 w-100">
            Sign up
          </button>
        </div>
        <div className="text-center">
          Have an account?{" "}
          <Link to={"/login"} style={{ cursor: "pointer" }}>
            <span className="parrot-green text-decoration-underline">
              Log in
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
