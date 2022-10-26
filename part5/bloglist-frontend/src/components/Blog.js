import Button from "./Button";
import { useState } from "react";
import PropTypes from "prop-types";

import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";
import { removeBlog, likeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog }) => {

  const dispatch = useDispatch();

  const [toggleView, setToggleView] = useState(false);
  const inlineStyleView = { display: toggleView ? "" : "none" };

  const likeBlogHandler = async (event) => {
    event.preventDefault();
    const response = await blogService.likeBlog(blog);
    dispatch(likeBlog(response.data));
  };

  const deleteBlogHandler = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .deleteBlog(blog)
        .then(() => dispatch(removeBlog(blog)))
        .catch((error) => {
          dispatch(showNotification(`${error}`));
        });
    }
  };

  return (
    <div className="blog">
      {blog.title} {blog.author} {blog.id}{" "}
      <Button
        className="toggleBlogVisibilityButton"
        text={toggleView ? "hide" : "show"}
        handler={() => setToggleView(!toggleView)}
      />
      <div className="url" style={inlineStyleView}>
        URL: {blog.url}
      </div>
      <div className="likes" style={inlineStyleView}>
        Likes: {blog.likes ? blog.likes : 0}{" "}
        <Button className="likeButton" text="Like" handler={likeBlogHandler} />
      </div>
      <div style={inlineStyleView}>
        <Button text="remove" handler={deleteBlogHandler} />
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
