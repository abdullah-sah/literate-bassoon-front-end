import "./style.scss";
import md5 from "md5";

import NewPostModal from "components/NewPostModal";

import { useState } from "react";

function Post(props) {
  const [editing, setEditing] = useState(false);

  return (
      <div className="post flex">
        <div className="main-container">
          <h3 className="creation-date">Published {props.creationDate}</h3>

          {editing ? (
            <input
              type="text"
              className="nice-input"
              placeholder="Post title"
              value={props.title}
            />
          ) : (
            <h2 className="title">{props.title}</h2>
          )}

          {editing ? (
            <textarea className="nice-input" placeholder="Post content">
              {props.content}
            </textarea>
          ) : (
            <p className="content">{props.content}</p>
          )}

          <div className="flex">
            {props.canEdit &&
              (editing ? (
                <div className="edit-btn">Save changes</div>
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

            {props.canEdit && <div className="edit-btn">Delete post</div>}
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
