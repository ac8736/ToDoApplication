import "./styles/Main.css";
import ToDoCard from "./ToDoCard";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function Main(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isAuth) {
      navigate("/");
    }
  }, []);

  const [postLists, setPostLists] = useState([]);
  const [update, setUpdate] = useState(true);
  const postsCollectionRef = collection(db, "ToDos");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [update]);

  async function logOut() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  function refresh() {
    console.log("RAN");
    setUpdate((prev) => !prev);
  }

  const newPosts = postLists.map((post) => {
    if (auth.currentUser.uid === post.author.id) {
      return (
        <ToDoCard refresh={refresh} key={post.id} title={post.title} due={post.dueDate} classes={post.classes} id={post.id} />
      );
    }
  });

  return (
    <div>
      <div className="signout">{props.isAuth && <button onClick={logOut}>Sign Out</button>}</div>
      <div className="add">
        {props.isAuth && (
          <button>
            <Link className="add-link" to="/add">
              Add Task
            </Link>
          </button>
        )}
      </div>
      {newPosts}
    </div>
  );
}

export default Main;
