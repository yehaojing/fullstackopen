import { useState } from "react";
import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";
import { removeBlog, likeBlog, commentBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Typography, Button } from "@mui/material";

const Blog = () => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

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

  const commentBlogHandler = async (event) => {
    event.preventDefault();
    if (comment){
      const response = await blogService.commentBlog(blog, comment);
      dispatch(commentBlog(response.data));
      setComment("");
    }
  };

  const deleteBlogHandler = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .deleteBlog(blog)
        .then(() => {
          dispatch(removeBlog(blog));
          navigate("/");
        })
        .catch((error) => {
          dispatch(showNotification(`${error}`, "error"));
        });
    }
  };



  return (
    <>
      <div className="blog_box">
        <Typography variant="h1">{blog.title} by {blog.author} </Typography>
        <div>
          <Typography>
            added by {blog.user.name}
          </Typography>
        </div>
        <div className="url">
          <Typography>
            URL: <Link>{blog.url}</Link>
          </Typography>
        </div>

        <div>
          <Typography variant="h3">Comments</Typography>
          <div className="likes">
            <Typography>
              Likes: {blog.likes ? blog.likes : 0}{" "}
              <Button variant="contained" label="Like" onClick={likeBlogHandler}>Like</Button>
            </Typography>
          </div>
          <form style={{ marginTop:10 }} onSubmit={commentBlogHandler}>
            <div>
              <input
                aria-label="Comment"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
              <Button type="submit">comment</Button>
            </div>
          </form>
          <ul>
            {blog.comments.map((comment, idx) => (<li key={idx}>{comment}</li>))}
          </ul>
        </div>
        <div>
          <Typography variant="h3">Delete Blog</Typography>
        </div>
        <div>
          <Button variant="contained" onClick={deleteBlogHandler}>Delete Blog</Button>
        </div>
      </div>
    </>


  );
};

export default Blog;
