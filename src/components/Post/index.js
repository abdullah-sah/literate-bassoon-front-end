import "./style.scss";
import md5 from "md5";

import { useState } from "react";
import retrieve from "utils/retrieve";
import { useLocation } from "react-router-dom";

function Post(props) {
  const location = useLocation().pathname.substring(1);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newContent, setNewContent] = useState(props.content);

  async function updatePost() {
    retrieve(
      "blog/" + location + "/posts/" + props.postId,
      "PUT",
      JSON.stringify({
        postTitle: newTitle,
        postContent: newContent,
        token: localStorage.getItem("blogToken"),
      })
    ).then((res) => {
      if (res.success) {
        window.location.reload();
      }
    });
  }

  async function deletePost() {
    retrieve("blog/" + location + "/posts/" + props.postId, "DELETE").then(
      (res) => {
        if (res.success) {
          window.location.reload();
        }
      }
    );
  }

  return (
    <div className="post flex">
      <div className="main-container">
        <h3 className="creation-date">Published {props.creationDate}</h3>

        {editing ? (
          <input
            type="text"
            className="nice-input"
            placeholder="Post title"
            defaultValue={props.title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <h2 className="title">{props.title}</h2>
        )}

        {editing ? (
          <textarea
            className="nice-input"
            placeholder="Post content"
            onChange={(e) => setNewContent(e.target.value)}
            defaultValue={props.content}
          />
        ) : (
          <p className="content">{props.content}</p>
        )}

        <div className="flex">
          {props.canEdit &&
            (editing ? (
              <div className="edit-btn" onClick={updatePost}>
                Save changes
              </div>
            ) : (
              <div
                className="edit-btn"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit
              </div>
            ))}

          {props.canEdit && (
            <div className="edit-btn" onClick={deletePost}>
              Delete post
            </div>
          )}
        </div>
      </div>

      <div className="thumbnail-container v-center">
        <img
          src={"https://picsum.photos/seed/" + md5(props.title) + "/1000/800"}
          alt=""
        />
      </div>
    </div>
  );
}

export default Post;
