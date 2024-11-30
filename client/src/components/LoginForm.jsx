import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
  });
  const [passwordEye, setPasswordEye] = useState(false);
  const navigate = useNavigate();

  function handleInput(e) {
    const key = e.target.name;
    let value = e.target.value;

    setUserValues((pre) => {
      return { ...pre, [key]: value };
    });
  }

  function handlePasswordEye(e) {
    setPasswordEye(!passwordEye);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const loading = toast.loading("Verifying your credentials...", {
      theme: "dark",
    });
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_API_URL + "/login",
        userValues
      );
      localStorage.setItem("app_auth", res.data.userToken);
      // localStorage.setItem("email", userValues.email);
      toast.update(loading, {
        render: `Welcome back, ${res.data.message}!`,
        type: "success",
        isLoading: false,
        autoClose: 1200,
      });
      navigate("/home");
    } catch (error) {
      toast.update(loading, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  }

  return (
    <div className="loginform d-flex align-items-center">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3 form-group">
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
        </div>
        <div className="mb-5 form-group">
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
              className="form-control"
              value={userValues.password}
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
        </div>
        <div className="mb-3">
          <small className="d-flex flex-row-reverse">
            <Link>Forgot password?</Link>
          </small>
        </div>
        <div className="mb-3">
          <button className="btn bg-parrot-green rounded px-4 w-100">
            Log in
          </button>
        </div>
        <div className="text-center">
          Don't have an account?{" "}
          <Link to={"/"}>
            <span className="parrot-green text-decoration-underline">
              Sign up
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
