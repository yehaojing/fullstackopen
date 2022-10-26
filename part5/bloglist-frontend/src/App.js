import { useEffect, useRef } from "react";

import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Button from "./components/Button";
import Notification from "./components/Notification";

import { showNotification } from "./reducers/notificationReducer";
import { addBlog, initialiseBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";

import "./index.css";

const App = () => {
  const blogs = useSelector(
    state => state.blog.slice()
  );

  const user = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(initialiseBlogs());
    }
  }, [user]);

  const logoutHandler = () => {
    dispatch(setUser(null));
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
      })
      .catch((error) => {
        dispatch(showNotification(`${error}`));
      });
  };

  const blogFormRef = useRef();

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
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
