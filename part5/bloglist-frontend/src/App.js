import { useEffect } from "react";
import NavBar from "./components/NavBar";
import MainView from "./components/MainView";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

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

  return (
    <div>

      <Notification />
      {login === null ? (
        <LoginForm />
      ) : (
        <>
          <NavBar />
          <h1>Blogs</h1>
          <div>
            <BlogForm/>
          </div>
          <MainView/>
        </>
      )}
    </div>
  );
};

export default App;
