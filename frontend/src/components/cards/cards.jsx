import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Card from "../card/card";
import "./cards.css";

function Cards() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/share/get_posts/${userData.user._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let postsdata = await response.data.data;
      setPosts(postsdata);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  Cards.getPosts = getPosts;

  return (
    <div className="cards">
      {posts.map((post) => {
        return (
          <Card
            like={post.post.likes}
            gener={post.post.genre}
            key={post.post._id}
            id={post.post._id}
            title={post.post.title}
            author={post.post.author}
            imageSrc={post.post.pic_url}
            review={post.post.review}
            user={post.user}
          />
        );
      })}
    </div>
  );
}

export default Cards;
