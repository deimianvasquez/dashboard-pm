import { useContext } from "react";
import AppContext from "../context/AppContext.js";
import Login from "../components/Login.jsx";

const Home = () => {
  const { state } = useContext(AppContext);
  console.log(state.token);
  return (
    <>
      {state.token === null ? (
        <Login />
      ) : (
        <div className="container">
          <div className="row justify-content-center my-4">
            <div className="col-12 col-md-6">
              <h1 className="text-center">My dashboard PM</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
