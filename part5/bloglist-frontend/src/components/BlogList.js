import { Paper, TableContainer, Table, TableBody, TableRow, TableCell  } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Link
} from "react-router-dom";

const BlogList = () => {

  const blogs = useSelector(
    state => state.blog.slice()
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs
            .sort((blogA, blogB) => blogB.likes - blogA.likes)
            .map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

    </TableContainer>

  );
};

export default BlogList;