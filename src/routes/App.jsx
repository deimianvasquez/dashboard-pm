import Layout from "../Layout.jsx";
import AppContext from "../context/AppContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useInitialState from "../hook/useInitialState.js";
import Home from "../pages/Home.jsx";

const App = () => {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </AppContext.Provider>
  );
};

export default App;
