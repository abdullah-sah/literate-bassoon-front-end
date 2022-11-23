import "./style.scss";
import Modal from "components/Modal";

function LoginModal(props) {
  return (
    <Modal
      open={props.open}
      closeHandler={props.closeHandler}
      children={
        <>
          <h1>Login to edit this blog</h1>

          <input
            type="password"
            placeholder="Password"
            className="nice-input"
          />

          <div className="btn no-shift">Login</div>
        </>
      }
    ></Modal>
  );
}

export default LoginModal;
