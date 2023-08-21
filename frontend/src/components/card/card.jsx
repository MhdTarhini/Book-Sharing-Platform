import React from "react";
import "./card.css";

function Card({ name, author, imageSrc, review }) {
  return (
    <div className="card">
      <img src={imageSrc} alt={name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <h5 className="card-author">{author}</h5>
        <p className="card-review">{review}</p>
      </div>
    </div>
  );
}

export default Card;
