import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Typography  } from "@mui/material";
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
      <Typography variant='h2'>Blogs</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs
              .sort((blogA, blogB) => blogB.likes - blogA.likes)
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell><a href={`https://${blog.url}`}>{blog.url}</a></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>


  );
};

export default BlogList;