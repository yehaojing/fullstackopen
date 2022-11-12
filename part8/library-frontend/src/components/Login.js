import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, ME } from "../queries";

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [ login, result ] = useMutation(LOGIN, { refetchQueries: [ { query: ME } ] } );

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      localStorage.setItem('library-user-token', token)
      window.location.reload()
    }
  }, [result.data])

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    login({
      variables: {
        username,
        password,
      },
    });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={submit}>
      Username
        <div>
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        Password
        <div>
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
