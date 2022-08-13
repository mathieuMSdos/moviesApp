import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { FavoritesContext } from "../context/FavoritesContext";

export default function UserList() {
  const [listMovies, setlistMovies] = useState([]);
  const { favoritesList, setfavoritesList } = useContext(FavoritesContext);

  useEffect(() => {


    // let moviesId = window.localStorage.movies
    //   ? window.localStorage.movies.split(",")
    //   : [];
    // console.log(moviesId);
    

    // ici pour chaque id de film que contient moviesID on fait une boucle pour aller chercher via l'api et l'id du film le film en question. Ensuite on ajoute la data du film à notre state listData.
    //
    // SOLUTION CONTEXT API
    // on met le tableau listMovies à vide à chaque fois que useeffect doit faire sont travail
    setlistMovies([])

    for (let i = 0; i < favoritesList.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${favoritesList[i]}?api_key=489e6804c33c153a74c43a379d22bb39&language=fr-FR&external_source=imdb_id`
        )
        .then((res) => {
          // cette méthode est la seule qui fonctionne pour ajouter l'item data à un notre tableau listdata comme il faut .push ça marche pas
          setlistMovies((listMovies) => [...listMovies, res.data]);
        });
    }
  }, [favoritesList]);

  console.log(listMovies);

  return (
    <div className="user-list-page">
      <Header></Header>
      <h2>
        Coup de coeur <span>❤️</span>
      </h2>

      <div className="result">
        {listMovies.length > 0 ? (
          listMovies.map((movieData) => (
              <Card movieData={movieData} key={movieData.id}></Card>

          ))
        ) : (
          <h2>Aucun coup de coeur</h2>
        )}
      </div>
    </div>
  );
}
