import { useEffect } from "react";
import BlogNavBar from "./components/BlogNavBar";
import MainView from "./components/MainView";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import { Container } from "@mui/material";



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

    <>
      <Container>
        {login === null ? (
          <LoginForm />
        ) : (
          <>
            <BlogNavBar />
            <h1>Blogs</h1>
            <div>
              <BlogForm/>
            </div>
            <MainView/>
          </>
        )}
        <Notification />
      </Container>
    </>
  );
};

export default App;
