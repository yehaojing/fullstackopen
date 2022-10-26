import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

import { useDispatch } from "react-redux";
import { setLogin } from "../reducers/loginReducer";
import { showNotification } from "../reducers/notificationReducer";

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
    } catch (exception) {
      dispatch(showNotification("Wrong username or password"));
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
        <div>
          Username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
