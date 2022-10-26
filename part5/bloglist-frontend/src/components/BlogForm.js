import { useState, useRef } from "react";
import Togglable from "./Togglable";

import { showNotification } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

import blogService from "../services/blogs";
import { initialiseUsers } from "../reducers/usersReducer";

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const createBlogHandler = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    blogService
      .postNewBlog(newBlog)
      .then((resp) => {
        newBlog.id = resp.id;
        dispatch(addBlog(newBlog));
        dispatch(showNotification(
          `a new blog "${newBlog.title}" by ${newBlog.author} added`
        ));
        dispatch(initialiseUsers());
      })
      .catch((error) => {
        dispatch(showNotification(`${error}`));
      });
  };

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <div>
        <h1>Add new blog</h1>
        <form onSubmit={createBlogHandler}>
          <div>
            Title{" "}
            <input
              aria-label="Title"
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            Author{" "}
            <input
              aria-label="Author"
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            URL{" "}
            <input
              aria-label="URL"
              value={newUrl}
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
