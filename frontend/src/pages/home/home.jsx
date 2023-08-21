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
      <Card
        name="The Great Book"
        author="John Doe"
        imageSrc="https://img.freepik.com/premium-photo/book-library-with-old-open-textbook-stack-piles-literature-text-archive-reading-desk_779468-5822.jpg"
        review="An amazing book that kept me hooked from start to finish!"
      />
      <Cards />
    </>
  );
}

export default Home;
