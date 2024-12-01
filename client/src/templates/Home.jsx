import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userData, setUserData] = useState();
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("app_auth");
    if (userToken == null) setSessionExpiredMessage(true);
    else {
      axios
        .get(import.meta.env.VITE_SERVER_API_URL + "/getUserHomeDetails", {
          headers: { auth: userToken },
        })
        .then((res) => setUserData(res.data));
    }
  }, []);

  function handleLogout() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("app_")) {
        localStorage.removeItem(key);
      }
    }
    navigate("/login");
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {sessionExpiredMessage && (
        <div
          className="sessionExpiredMessage bg-primary p-3"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%",
            zIndex: 999,
          }}
        >
          <p className="">Session Expired Please Log in</p>
          <button
            className="btn p-1 py-0 btn-warning float-end"
            onClick={handleLogout}
          >
            Ok
          </button>
        </div>
      )}
      <div
        className="h-100"
        style={
          sessionExpiredMessage
            ? {
                pointerEvents: "none",
                filter: "blur(1.4px)",
                backgroundColor: "gray",
              }
            : {}
        }
      >
        <ul className="list-unstyled">
          <li>USERNAME : {userData?.userName}</li>
          <li>EMAIL : {userData?.email}</li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
