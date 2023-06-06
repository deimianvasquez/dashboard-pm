import { useState, useContext } from "react";
import AppContext from "../context/AppContext.js";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const { email, password } = user;
  const { login } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    login(user);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-7 col-lg-6 border border-danger d-flex flex-column direction-column justify-content-center align-items-center vh-100">
            <h1>Iniciar sesión</h1>
            <form className="border p-4" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div className="my-3">
                <button className="btn btn-primary w-100">
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
