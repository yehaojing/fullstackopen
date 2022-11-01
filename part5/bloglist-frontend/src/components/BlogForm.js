import { useState, useRef } from "react";

import { showNotification } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography } from "@mui/material";

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
        dispatch(addBlog(resp));
        dispatch(showNotification(
          `a new blog "${resp.title}" by ${resp.author} added`, "success"
        ));
        dispatch(initialiseUsers());
      })
      .catch((error) => {
        dispatch(showNotification(`${error}`, "error"));
      });
  };

  return (
    <div>
      <Typography variant='h2'>Create a Blog</Typography>
      <form onSubmit={createBlogHandler}>
        <div>
          <TextField
            label="Title"
            aria-label="Title"
            value={newTitle}
            style={{ marginBottom: 10 }}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Author"
            aria-label="Author"
            value={newAuthor}
            style={{ marginBottom: 10 }}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="URL"
            aria-label="URL"
            value={newUrl}
            style={{ marginBottom: 10 }}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <div>
          <Button style={{ marginBottom: 10 }} variant="contained" type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
