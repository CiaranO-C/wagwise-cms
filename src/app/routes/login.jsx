import { useContext, useEffect, useState } from "react";
import { login } from "../../services/authService.js";
import { AuthContext } from "../../services/authProvider.jsx";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/admin/home");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const userLogin = await login(username, password);
      //if server returns error message, re-render and display
      if (userLogin?.error) {
        return setErrors(userLogin.error);
      } else {
        navigate("/admin/home");
        console.log("cya!");
        return setUser(userLogin.user);
      }
    } catch (err) {
      setErrors(err.message);
    }
  }

  function handleChange({ target }) {
    if (target.id === "username") {
      setUsername(target.value);
    } else {
      setPassword(target.value);
    }
  }

  //prevent log-in screen flashing if user already logged in
  if (loading) return;

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
      <div>{errors}</div>
      <Link to="/sign-up"> Sign up! </Link>
    </div>
  );
}

export default Login;
