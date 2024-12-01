import { Helmet } from "react-helmet";
import Sideup from "../components/Sideup";
import SignupForm from "../components/SignupForm";
import "../styles/signup.css";

export default function Signup() {
  return (
    <div className="container-md d-flex justify-content-center align-items-center" style={{height:"720px"}}>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className="signup" style={{height:'85%'}}>
        <div className="side-up-div">
          <Sideup title={"Sign up"}/>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
