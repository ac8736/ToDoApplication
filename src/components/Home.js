import "./styles/Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  props.setAuth(false);

  return (
    <div className="home--container">
      <h1>
        All Tasks <br />
        Neatly Displayed <br />
        For You.
      </h1>
      <button className="login-button">
        <Link className="login" to="/signin">
          Sign In
        </Link>
      </button>
    </div>
  );
}

export default Home;
