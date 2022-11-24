import "./style.scss";
import NavBar from "components/NavBar";

function ErrorPage404() {
  return (
    <>
      <NavBar></NavBar>

      <div className="error-page-main">
        <h1>404 Not Found</h1>
      </div>
    </>
  );
}

export default ErrorPage404;
