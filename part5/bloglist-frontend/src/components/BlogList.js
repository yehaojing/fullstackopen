import { useSelector } from "react-redux";
import {
  Link
} from "react-router-dom";

const BlogList = () => {

  const blogs = useSelector(
    state => state.blog.slice()
  );

  return (
    <>
      {blogs
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <div className="blog_box" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </div>
        ))}
    </>
  );
};

export default BlogList;