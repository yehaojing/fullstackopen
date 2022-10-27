import Button from "./Button";

import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";
import { removeBlog, likeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Blog = () => {

  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector((state) => state.blog.find((blog) => blog.id === id));
  if (!blog) {
    return (<></>);
  }

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
    <div className="blog_box">
      <h1>{blog.title} by {blog.author} </h1>
      <div className="url">
        URL: <Link>{blog.url}</Link>
      </div>
      <div className="likes">
        Likes: {blog.likes ? blog.likes : 0}{" "}
        <Button className="likeButton" text="Like" handler={likeBlogHandler} />
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <div>
        <Button text="remove" handler={deleteBlogHandler} />
      </div>
    </div>
  );
};

export default Blog;
