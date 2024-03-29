import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

import { useDispatch } from "react-redux";
import { setLogin } from "../reducers/loginReducer";
import { showNotification } from "../reducers/notificationReducer";
import { initialiseBlogs } from "../reducers/blogReducer";
import { initialiseUsers } from "../reducers/usersReducer";

import { TextField, Button } from "@mui/material";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLogin(user));
      dispatch(initialiseBlogs());
      dispatch(initialiseUsers());
    } catch (exception) {
      dispatch(showNotification("Wrong username or password", "error"));
      blogService.setToken("");
      dispatch(setLogin(null));
    }
  };

  const login = (event) => {
    event.preventDefault();
    loginHandler(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        Username
        <div>
          <TextField
            style={{ paddingBottom: 20 }}
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        Password
        <div>
          <TextField
            style={{ paddingBottom: 20 }}
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" type="submit">login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
