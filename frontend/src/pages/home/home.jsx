import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import ShareBook from "../../components/shareBook/shareBook";
import Cards from "../../components/cards/cards";
import SearchCard from "../../components/searchCards/SearchCard";

function Home() {
  const [search, setSearch] = useState("");
  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <ShareBook />
      {search === "" ? <Cards /> : <SearchCard search={search} />}
    </>
  );
}

export default Home;
