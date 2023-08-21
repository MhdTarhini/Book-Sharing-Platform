import React from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/card/card";
import ShareBook from "../../components/shareBook/shareBook";
import Cards from "../../components/cards/cards";

function Home() {
  return (
    <>
      <Navbar />
      <ShareBook />
      <Cards />
    </>
  );
}

export default Home;
