import LoginForm from "../components/LoginForm";
import Sideup from "../components/Sideup";

export default function Login() {
  return (
    <div className="container-md d-flex justify-content-center align-items-center" style={{height:"720px"}}>

      <div className="login m-5" style={{height:'70%'}}>
        <LoginForm />
        <div className="side-up-div">
          <Sideup title={"Log in"}/>
        </div>
      </div>
    </div>
  );
}
