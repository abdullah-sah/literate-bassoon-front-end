import "./style.scss";
import Modal from "components/Modal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import retrieve from "utils/retrieve";

function NewPostModal(props) {
  const location = useLocation().pathname.substring(1);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [info, setInfo] = useState();
  async function createPost() {
    retrieve(
      "blog/" + location + "/posts",
      "PUT",
      JSON.stringify({
        postTitle: title,
        postContent: content,
        token: localStorage.getItem("blogToken"),
      })
    )
      .then((res) => {
        if (res.success) {
          window.location.reload();
        } else {
          setInfo("Something went wrong...");
        }
      })
      .catch((e) => setInfo("Something went really wrong..."));
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
