import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../card/card";

function SearchCards({ search }) {
  const [dataSearch, setDataSearch] = useState([]);
  const [isMatch, setIsMatch] = useState(false);

  const handleSearch = async () => {
    if (search !== "") {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/search/?query=${search}`
        );
        if (response.data.message === "success") {
          const postSearch = await response.data.data;
          setDataSearch(postSearch);
          setIsMatch(true);
        } else {
          setIsMatch(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(dataSearch);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="cards">
      {isMatch ? (
        dataSearch.map((post, index) => {
          return (
            <Card
              key={index}
              like={post.likes}
              gener={post.genre}
              title={post.title}
              author={post.author}
              imageSrc={post.pic_url}
              review={post.review}
              user={post.user}
            />
          );
        })
      ) : (
        <>no match found</>
      )}
    </div>
  );
}

export default SearchCards;
