import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
      event.preventDefault()
      loginHandler(username, password)
      setUsername('')
      setPassword('')
  }

  return (
    <div>
      <h1>
        Login
      </h1>
      <form onSubmit={login}>
        <div>
          Username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired
}

export default LoginForm