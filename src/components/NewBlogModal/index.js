import "./style.scss";
import Modal from "components/Modal";

function NewBlogModal(props) {
  return (
    <Modal
      open={props.open}
      closeHandler={props.closeHandler}
      children={
        <>
          <h1>Create new blog</h1>

          <input type="text" placeholder="Blog name" className="nice-input" />
          <input
            type="password"
            placeholder="Password"
            className="nice-input"
          />

          <div className="btn no-shift">Create blog</div>
        </>
      }
    ></Modal>
  );
}

export default NewBlogModal;
