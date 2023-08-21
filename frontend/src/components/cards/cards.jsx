import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

function Cards() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

  const [Posts, setPosts] = useState([]);

  const getPosts = () => {
    try {
      const response = axios.get(
        `http://127.0.0.1:8000/share/get_posts/${userData.user._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={getPosts}>click</button>
    </div>
  );
}

export default Cards;
