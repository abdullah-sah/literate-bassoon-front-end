import "./style.scss";
import Modal from "components/Modal";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function NewPostModal(props) {
  const location = useLocation().pathname.substring(1);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [info, setInfo] = useState();
  async function createPost() {
    try {
      await fetch("http://localhost:3001/blog/" + location + "/posts", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          postTitle: title,
          postContent: content,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setInfo(
            "A new post was created at " + new Date().toLocaleTimeString()
          );
        }
      });
    } catch (error) {
      console.log(error);
      setInfo("Something went wrong...");
    }
  }
  return (
    <Modal
      open={props.open}
      closeHandler={props.closeHandler}
      children={
        <>
          <p>{info}</p>
          <h1>Create new post</h1>

          <input
            type="text"
            placeholder="Post title"
            className="nice-input"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="nice-input"
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="btn no-shift" onClick={createPost}>
            Create post
          </div>
        </>
      }
    ></Modal>
  );
}

export default NewPostModal;
