import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import "./styles/AddTask.css";

function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [classes, setClasses] = useState("");

  const postsCollectionRef = collection(db, "ToDos");
  console.log("Entered add tasks");

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (!user) {
      console.log("no user");
      navigate("/");
    }
  });

  async function handleClick() {
    try {
      await addDoc(postsCollectionRef, {
        title,
        dueDate,
        classes,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });
      navigate("/main");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div>
        <h2 className="addtask-title">Add Item</h2>
      </div>
      <div className="addTask--container">
        <input type="text" placeholder="Title..." onChange={(event) => setTitle(event.target.value)} value={title} />
        <input type="text" placeholder="Due Date..." onChange={(event) => setDueDate(event.target.value)} value={dueDate} />
        <input type="text" placeholder="Class..." onChange={(event) => setClasses(event.target.value)} value={classes} />
      </div>
      <div className="addtask-button">
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}

export default AddTask;
