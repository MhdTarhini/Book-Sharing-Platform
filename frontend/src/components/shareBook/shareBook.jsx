import React, { useContext, useState } from "react";
import "./shareBook.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

function ShareBook() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

  const [postImage, setPostImage] = useState(null);
  const [data, setdata] = useState({
    userId: userData.user._id,
    title: "",
    author: "",
    review: "",
    pic_url: postImage,
  });

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
      if (response.data.message === "Book post added successfully") {
        setdata({
          userId: userData.user._id,
          title: "",
          author: "",
          genre: "",
          review: "",
          pic_url: null,
        });
      }
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
      setPostImage(filename);
      setdata({ ...data, pic_url: filename });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="input-post">
      <h2>Share Your Favorite Book</h2>
      <div className="input-fields">
        <input
          type="text"
          placeholder="Book Title"
          name="title"
          value={data.title}
          className="input-one"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={data.author}
          className="input-one"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Gener"
          name="genre"
          value={data.genre}
          className="input-one"
          onChange={handleChange}
        />
        <textarea
          placeholder="Your Review"
          name="review"
          value={data.review}
          onChange={handleChange}
        />
        <input
          type="file"
          id="image"
          name="file"
          className="input-one"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="image" className="image-upload-label">
          Upload Image
        </label>
        <button type="button" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

export default ShareBook;
