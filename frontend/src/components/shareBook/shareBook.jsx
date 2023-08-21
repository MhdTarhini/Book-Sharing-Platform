// InputPost.js

import React, { useState } from "react";
import "./shareBook.css";
import axios from "axios";

function ShareBook({ onSubmit }) {
  const [data, setdata] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setdata({ ...data, image: e.target.files[0] });
  };
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="input-post">
      <h2>Share Your Favorite Book</h2>
      <div className="input">
        <input type="text" placeholder="Book Title" onChange={handleChange} />
        <input type="text" placeholder="Author" onChange={handleChange} />
        <textarea placeholder="Your Review" onChange={handleChange} />
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

export default ShareBook;
