import { useEffect } from "react";
import NavBar from "./components/NavBar";
import MainView from "./components/MainView";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Button from "./components/Button";
import Notification from "./components/Notification";

import { initialiseBlogs } from "./reducers/blogReducer";
import { setLogin } from "./reducers/loginReducer";
import { initialiseUsers } from "./reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";

import "./index.css";

const App = () => {

  const login = useSelector(
    state => state.login
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const login = JSON.parse(loggedUserJSON);
      dispatch(setLogin(login));
      blogService.setToken(login.token);
      dispatch(initialiseBlogs());
      dispatch(initialiseUsers());
    }
  }, []);

  const logoutHandler = () => {
    dispatch(setLogin(null));
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <div>
      <NavBar />
      <Notification />
      {login === null ? (
        <LoginForm />
      ) : (
        <>
          <div>
            Logged in as {login.name}{" "}
            <Button text="logout" handler={logoutHandler} />
          </div>
          <div>
            <BlogForm/>
          </div>
          <h2>Blogs</h2>
          <MainView/>
        </>
      )}
    </div>
  );
};

export default App;
