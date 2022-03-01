import "./styles/SignIn.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function register() {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await createUserWithEmailAndPassword(auth, email, password);
      props.setAuth(true);
      navigate("/main");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="signin--container">
      <h2>Register</h2>
      <input type="email" placeholder="Email..." onChange={(event) => setEmail(event.target.value)} value={email} />
      <input type="password" placeholder="Password..." onChange={(event) => setPassword(event.target.value)} value={password} />
      <Link className="register" to="/signin">
        Already have an account? Sign in
      </Link>
      <button className="submit" onClick={register}>
        Submit
      </button>
    </div>
  );
}

export default Register;
