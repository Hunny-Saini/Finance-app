import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    //checking for empty feilds
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All feilds are mandatory!");
      setLoading(false);
    } else {
      if (password === confirmPassword) {
        //authenticate user
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // console.log(user);
            toast.success("Loggin Success!");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setLoading(false);
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        setLoading(false);
        toast.error("Password and Confirm Password don't match!");
      }
    }
  }

  function loginWithEmail() {
    setLoading(true);
    if (!email || !password) {
      toast.error("All feilds are mandatory!");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          toast.success("Logged In Success!");
          // createDoc(user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  }

  function googleAuth() {
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        createDoc(user);
        navigate("/dashboard");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        toast.success("Logged In Success!");
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setLoading(false);
      });
    }catch(e){
      toast.error(e.message);
      setLoading(false);
    }
    
  }

  async function createDoc(user) {
    setLoading(true);
    //create a doc
    //on every signin checking if the uid exist or not
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists!");
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Button
              text={loading ? "Loading..." : "Login Using Email"}
              outline={true}
              onClick={loginWithEmail}
              disabled={loading}
            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button
              text={loading ? "Loading..." : "Login Using Google"}
              outline={false}
              disabled={loading}
              onClick={googleAuth}
            />
            <p
              style={{
                textAlign: "center",
                cursor: "pointer",
                fontSize: "0.75rem",
              }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Don't have an account?{" "}
              <span style={{ color: "var(--theme)" }}>Signup</span>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type={"text"}
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              text={loading ? "Loading..." : "Signup Using Email"}
              outline={true}
              onClick={signupWithEmail}
              disabled={loading}
            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button
              text={loading ? "Loading..." : "Signup Using Google"}
              outline={false}
              disabled={loading}
              onClick={googleAuth}
            />
            <p
              style={{
                textAlign: "center",
                cursor: "pointer",
                fontSize: "0.75rem",
                marginTop: "0px",
                marginBottom: "8px",
              }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Already have an account?{" "}
              <span style={{ color: "var(--theme)" }}>Login</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSignin;
