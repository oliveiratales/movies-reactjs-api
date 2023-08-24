import React, { useEffect, useState } from "react";
import "./App.css";
import Api from "./Api";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadAll = async () => {
      let list = await Api.getHomeList();

      setMovieList(list);

      let trending = list.filter((i) => i.slug === "trending");
      let randomChosen = Math.floor(
        Math.random() * (trending[0].items.results.length - 1)
      );
      let chosen = trending[0].items.results[randomChosen];
      let chosenInfo = await Api.getMovieInfo(chosen.id, "movie");

      console.log(chosenInfo);

      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  return (
    <div className="page">
      <Header
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setSearchTerm={setSearchTerm}
      />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      {movieList.length <= 0}
    </div>
  );
};
