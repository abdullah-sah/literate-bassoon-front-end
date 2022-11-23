import "./style.scss";
import Modal from "components/Modal";

function NewPostModal(props) {
  return (
    <Modal
      open={props.open}
      closeHandler={props.closeHandler}
      children={
        <>
          <h1>Create new post</h1>

          <input type="text" placeholder="Post title" className="nice-input" />
          <textarea className="nice-input" placeholder="Content"></textarea>

          <div className="btn no-shift">Create post</div>
        </>
      }
    ></Modal>
  );
}

export default NewPostModal;
