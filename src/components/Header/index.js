import React, { useEffect } from "react";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from "./../../assets/user.svg"

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function handleLogout() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logout Success!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      {user && (
        <div className="logout-container">
          <img src={user.photoURL ? user.photoURL : userImg} alt="user" width={"32"} height={"32"} style={{borderRadius:"50%"}}/>
          <p className="link" onClick={handleLogout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
