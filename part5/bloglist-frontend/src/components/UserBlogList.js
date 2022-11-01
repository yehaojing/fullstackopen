import { Typography, List, ListItem, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserBlogList = ({ user }) => {
  const navigate = useNavigate();
  if (!user) {
    return (
      <div>User Not Found!</div>
    );
  }

  if (user.blogs.length === 0) {
    return (
      <div>No blogs added...(yet)</div>
    );
  }

  return (
    <>
      <Typography variant="h1">
        {user.name}
      </Typography>
      <List>
        {user.blogs.map(blog => {
          return (
            <ListItem key={blog.id} disablePadding>
              <ListItemButton onClick={() => navigate(`/blogs/${blog.id}`)}>
                {blog.title}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>

  );
};

export default UserBlogList;