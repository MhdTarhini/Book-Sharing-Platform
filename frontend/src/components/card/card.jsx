import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

function Card({ id, title, author, imageSrc, review, user, like, gener }) {
  const { userData } = useContext(AuthContext);
  const [userliked, setUserliked] = useState(false);
  const [userfollow, setUserfollow] = useState(false);

  const isLiked = () => {
    if (like.length > 0) {
      like.map((postLike) => {
        if (postLike.user_id === userData.user._id) {
          setUserliked(true);
        } else {
          setUserliked(false);
        }
      });
    } else {
      setUserliked(false);
    }
  };

  const handleFollow = async () => {
    const data = new FormData();
    data.append("followerId", userData.user._id);
    data.append("followingId", user.userId);
    try {
      if (!userfollow) {
        await axios.post(`http://127.0.0.1:8000//user/follow`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserfollow(true);
      } else {
        await axios.post(`http://127.0.0.1:8000/user/unfollow/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserfollow(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLike = async () => {
    const data = new FormData();
    data.append("user_id", userData.user._id);
    data.append("postId", id);
    try {
      if (!userliked) {
        await axios.post(`http://127.0.0.1:8000/like/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserliked(true);
      } else {
        await axios.post(`http://127.0.0.1:8000/like/unlike/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserliked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let imageUrl = "";
  if (imageSrc == undefined || imageSrc == null) {
    imageUrl = `https://img.freepik.com/premium-photo/book-library-with-old-open-textbook-stack-piles-literature-text-archive-reading-desk_779468-5822.jpg`;
  } else {
    imageUrl = `../uploads/images/${imageSrc}`;
  }
  useEffect(() => {
    isLiked();
  }, [like]);
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h5 className="card-author">
          {author} , {gener}
        </h5>
        <p className="card-review">{review}</p>

        {user && (
          <div className="card-user">
            <div>
              Posted by: {user.firstName} {user.lastName}
            </div>
            <div
              className="follow"
              onClick={() => {
                handleFollow();
              }}>
              {userfollow ? (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#F0F8FF"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="white" />
                  <path
                    d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  fill="#000000"
                  width="20px"
                  height="20px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.002 27.959c0-0.795 0.597-1.044 0.835-1.154l8.783-4.145c0.63-0.289 1.064-0.885 1.149-1.573s-0.193-1.37-0.733-1.803c-2.078-1.668-3.046-5.334-3.046-7.287v-4.997c0-2.090 3.638-4.995 7.004-4.995 3.396 0 6.997 2.861 6.997 4.995v4.998c0 1.924-0.8 5.604-2.945 7.292-0.547 0.43-0.831 1.115-0.749 1.807 0.082 0.692 0.518 1.291 1.151 1.582l2.997 1.422 0.494-1.996-2.657-1.243c2.771-2.18 3.708-6.463 3.708-8.864v-4.997c0-3.31-4.582-6.995-8.998-6.995s-9.004 3.686-9.004 6.995v4.997c0 2.184 0.997 6.602 3.793 8.846l-8.783 4.145s-1.998 0.89-1.998 1.999v3.001c0 1.105 0.895 1.999 1.998 1.999h21.997v-2l-21.996 0.001v-2.029zM30.998 25.996h-3v-3c0-0.552-0.448-1-1-1s-1 0.448-1 1v3h-3c-0.552 0-1 0.448-1 1s0.448 1 1 1h3v3c0 0.552 0.448 1 1 1s1-0.448 1-1v-3h3c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
                </svg>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="like-button">
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer icon"
          onClick={() => {
            handleLike();
          }}>
          <path
            d="M895.36 243.904a251.52 251.52 0 0 0-355.776 0l-20.096 20.096-20.096-20.096A251.52 251.52 0 0 0 143.616 599.68S466.24 926.72 512 928c14.336 0.384 86.4-59.52 164.224-128.192l-0.512-0.64a22.016 22.016 0 0 0-11.968-40.896 21.76 21.76 0 0 0-14.784 5.888l-0.064-0.064 62.336-56.832a22.08 22.08 0 0 0-7.808 16.704 22.4 22.4 0 0 0 22.4 22.464c5.44 0 10.24-2.176 14.208-5.44l0.256 0.32 50.048-45.76-0.448-0.448a22.08 22.08 0 0 0-16.768-36.992 21.952 21.952 0 0 0-14.656 5.824l80.384-73.472 0.512 0.512a22.08 22.08 0 0 0-5.696 14.592 22.4 22.4 0 0 0 22.4 22.464 22.016 22.016 0 0 0 14.272-5.504l0.32 0.384 24.832-23.168a251.776 251.776 0 0 0-0.128-355.84z"
            fill=""
          />
          <path
            d="M510.976 878.656c-51.008-33.344-207.168-180.416-335.488-310.528a206.976 206.976 0 0 1-0.192-292.544c39.04-39.104 91.008-60.608 146.24-60.608s107.136 21.504 146.176 60.544l51.84 51.84 51.84-51.776c39.04-39.04 90.944-60.544 146.176-60.544s107.2 21.504 146.176 60.544c39.04 39.04 60.544 90.944 60.544 146.24s-21.504 107.136-60.544 146.176c-140.096 131.776-301.76 276.032-352.768 310.656z"
            fill={userliked ? "#FF5F5F" : "#fcfcfc"}
          />
          <path
            d="M308.032 641.984a15.872 15.872 0 0 1-10.112-3.648 757.12 757.12 0 0 1-53.504-48.896 875.968 875.968 0 0 0-25.856-24.64C141.376 495.488 145.344 423.616 145.536 420.544 143.808 318.976 237.376 264.64 241.344 262.4a16 16 0 0 1 15.808 27.84c-0.832 0.448-81.088 47.488-79.744 131.2-0.064 3.648-2.368 61.248 62.528 119.552 8.704 7.808 17.536 16.448 26.816 25.536 15.616 15.36 31.808 31.168 51.328 47.104a15.936 15.936 0 1 1-10.048 28.352zM422.656 751.36a15.872 15.872 0 0 1-11.2-4.544l-61.312-60.032a16 16 0 1 1 22.4-22.912l61.312 60.032a16 16 0 0 1-11.2 27.456z"
            fill="#FFFFFF"
          />
        </svg>
        Like
      </div>
    </div>
  );
}

export default Card;
