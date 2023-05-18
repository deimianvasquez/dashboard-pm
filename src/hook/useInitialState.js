import { useState } from "react";

const useInitialState = () => {
  const [state, setState] = useState({
    token: null,
  });

  const login = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_BASE}/v1/auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${import.meta.env.VITE_JWT_TOKEN}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const result = await response.json();
        setState({
          ...state,
          token: result.token,
        });

        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    state,
    login,
  };
};

export default useInitialState;
