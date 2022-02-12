import "./styles/ToDoCard.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

function ToDoCard(props) {
  async function deletePost(id) {
    const postDoc = doc(db, "ToDos", id);
    await deleteDoc(postDoc);
    props.refresh();
  }

  return (
    <div className="ToDoCard">
      <h2>{props.title}</h2>
      <h3>Due Date: {props.due}</h3>
      <h3>Class: {props.classes}</h3>
      <button onClick={() => deletePost(props.id)}>Task Completed!</button>
    </div>
  );
}

export default ToDoCard;
