import React, { useContext, useState } from "react";
import "./shareBook.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

function ShareBook() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

  const [data, setdata] = useState({
    userId: userData.user._id,
    title: "",
    author: "",
    review: "",
    pic_url: null,
  });
  const [postImage, setPostImage] = useState(null);

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      setPostImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async () => {
    await uploadImage();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/share/share_book",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/uploadImage",
        { image: postImage },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const filename = response.data.filename;
      console.log(filename);
      setdata({ ...data, pic_url: filename });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="input-post">
      <h2>Share Your Favorite Book</h2>
      <div className="input">
        <input
          type="text"
          placeholder="Book Title"
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          onChange={handleChange}
        />
        <textarea
          placeholder="Your Review"
          name="review"
          onChange={handleChange}
        />
        <input
          type="file"
          id="image"
          name="file"
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
