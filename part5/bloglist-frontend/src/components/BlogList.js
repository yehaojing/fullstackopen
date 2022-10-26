import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {

  const blogs = useSelector(
    state => state.blog.slice()
  );

  return (
    <>
      {blogs
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </>
  );
};

export default BlogList;