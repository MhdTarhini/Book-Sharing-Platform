import React, { useContext, useState } from "react";
import "./shareBook.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Cards from "../../components/cards/cards";

function ShareBook() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [data, setData] = useState({
    userId: userData.user._id,
    title: "",
    author: "",
    review: "",
    genre: "",
    pic_url: null,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    await uploadImage();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/share/share_book",
        {
          userId: userData.user._id,
          title: data.title,
          author: data.author,
          review: data.review,
          genre: data.genre,
          pic_url: postImage ? await uploadImage() : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.message === "Book post added successfully") {
        setData({
          userId: userData.user._id,
          title: "",
          author: "",
          review: "",
          gener: "",
          pic_url: null,
        });
        Cards.getPosts();
      } else {
        setErrorText(response.data.message);
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    if (postImage) {
      console.log(postImage);
      const formData = new FormData();
      formData.append("file", postImage);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/uploadImage",
          formData
        );
        const filename = response.data.filename;
        setData({ ...data, pic_url: filename });
        return filename;
      } catch (error) {
        console.log(error);
      }
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
        {/* <div className="error">{error ? <div>{errorText}</div> : null}</div> */}
      </div>
    </div>
  );
}

export default ShareBook;
