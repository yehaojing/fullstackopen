import {
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { setLogin } from "../reducers/loginReducer";
const BlogNavBar = () => {
  const login = useSelector(
    state => state.login
  );

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setLogin(null));
    window.localStorage.removeItem("loggedBlogAppUser");
  };
  return (
    <AppBar>
      <Toolbar>
        <Button style={{ textTransform: "none" }} color ="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button style={{ textTransform: "none" }} color ="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button style={{ textTransform: "none" }} color ="inherit" component={Link} to="/create">
          Create a Blog
        </Button>
        <Typography sx={{ marginLeft: "auto" }}>
              Logged in: {login.name}
        </Typography>
        <Button color="inherit" style={{ marginLeft: 20 }} variant="outlined" onClick={logoutHandler} >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default BlogNavBar;
