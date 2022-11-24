import "./style.scss";
import Modal from "components/Modal";
import retrieve from "utils/retrieve";
import { useState } from "react";

function LoginModal(props) {
  const [passwordAttempt, setPasswordAttempt] = useState("");
  const [failedAttempt, setFailedAttempt] = useState(false);

  let login = () => {
    retrieve(
      "blog/" + props.blogAddress + "/login",
      "POST",
      JSON.stringify({ password: passwordAttempt })
    ).then((res) => {
      if (res.success) {
        //Successful login
        setFailedAttempt(false);
        window.localStorage.setItem("blogToken", res.token);
        window.location.reload();
      } else {
        //Unsuccessful login
        setFailedAttempt(true);
      }
    });
  };

  return (
    <Modal
      open={props.open}
      closeHandler={props.closeHandler}
      children={
        <>
          <h1>Login to edit this blog</h1>

          {failedAttempt && (
            <p className="incorrect-password">Incorrect password!</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="nice-input"
            onInput={(e) => {
              setPasswordAttempt(e.target.value);
            }}
          />

          <div className="btn no-shift" onClick={login}>
            Login
          </div>
        </>
      }
    ></Modal>
  );
}

export default LoginModal;
