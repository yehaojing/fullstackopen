import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Button from "./components/Button";
import Notification from "./components/Notification";

import { showNotification } from "./reducers/notificationReducer";
import { addBlog, initialiseBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";
import loginService from "./services/login";

import "./index.css";

const App = () => {
  const blogs = useSelector(
    state =>  state.blog.slice()
  );
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(initialiseBlogs());
    }
  }, [user]);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      dispatch(showNotification("Wrong username or password"));
      blogService.setToken("");
      setUser(null);
      // setTimeout(() => {
      //   dispatch(showNotification(null);
      // }, 5000);
    }
  };

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .postNewBlog(newBlog)
      .then((resp) => {
        newBlog.id = resp.id;
        dispatch(addBlog(newBlog));
        dispatch(showNotification(
          `a new blog "${newBlog.title}" by ${newBlog.author} added`
        ));
        // setTimeout(() => {
        //   dispatch(showNotification(null);
        // }, 5000);
      })
      .catch((error) => {
        dispatch(showNotification(`${error}`));
        // setTimeout(() => {
        //   dispatch(showNotification(null);
        // }, 5000);
      });
  };

  const blogFormRef = useRef();

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm loginHandler={handleLogin} />
      ) : (
        <>
          <div>
            Logged in as {user.name}{" "}
            <Button text="logout" handler={logoutHandler} />
          </div>
          <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
          </div>
          <h2>Blogs</h2>
          {blogs
            .sort((blogA, blogB) => blogB.likes - blogA.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
