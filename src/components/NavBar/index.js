import "./style.scss";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();

  return (
    <div className="navbar flex">
      <div className="navbar-left flex">
        <div className="nav-item logo-container v-center" onClick={ () => { navigate('/') }}>
          <h1 className="logo">Bloggr.io</h1>
        </div>
      </div>
      <div className="navbar-right flex">{props.buttons}</div>
    </div>
  );
}

export default NavBar;
