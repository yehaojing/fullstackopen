import {
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { setLogin } from "../reducers/loginReducer";

const NavBar = () => {
  const padding = {
    paddingRight: 5
  };

  const login = useSelector(
    state => state.login
  );

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setLogin(null));
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <div className="navbar">
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      {login.name}{" "} <Button text="logout" handler={logoutHandler} />
    </div>
  );
};

export default NavBar;
