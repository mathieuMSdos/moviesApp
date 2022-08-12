import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  // *************** State part ***************

  const [moviesData, setMoviesData] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [search, setSearch] = useState("new york");
  const [sortGoodBad, setSortGoodBad] = useState(null);

  // *************** Logic part ***************

  useEffect(() => {
    // pour tester si un lien requête vers api fonctionne il suffit de le copier/coller dans son navigateur et normalement un fichier json doit s'afficher avec les infos demandées

    // ici on va utiliser un useeffect pour faire un appel API une seule fois au chargement de la page avec le ,[]
    //pour récupérer de la data avec exios on a juste à faire get(url).then((response) => {})

    //Ici "response" contiendra toutes les données qu'on est allé demander à l'API. C'est un json donc un objet javascript contenant toute la data

    // maintenant qu'on a la data on veux la stocker dans une variable. En REACT dès que tu veux créer une variable en fait il faut créer un state. Donc on créé un state avec un setstate. Et dans la méthode then on va juste setstate avec cette data reçu de l'api.

    // ici on utilise les guillement de alt 7 `` pour y mettre l'url afin d'insérer une variable au niveau du query. Car c'est ici que l'on doit mettre la recherche. donc on a mis le state search qui contient la recherche de l'utilisateur en tant que variable dans l'url.
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=489e6804c33c153a74c43a379d22bb39&query=${search}&language=fr-FR&page=1&include_adult=fal`
  

        )
      .then((response) => {
        setMoviesData(response.data.results);
      });

    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=489e6804c33c153a74c43a379d22bb39&language=fr-Fr"
      )
      .then((genreListAPI) => {
        setGenreList(genreListAPI.data.genres);
      });

    // comme on déclaré useeffect avec [] vide la requête ne s'est faite qu'une fois au démarrage. Mais on peux dire fait une nouvelle fois ce que contient le useeffect (donc des requête API à chaque fois que tel state est modifié. Donc en l'occurence c'est quand le state recherche est modifié que l'on veux une nouvelle recherche. Donc ont met entre [] le state search (qui contient la recherche du user)
  }, [search]);

  // ***************Screen part ***************

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            // ici on récupère la valeur taper par l'user et on la fait passer direct dans le state search.
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <div className="btn-sort-container">
            <div className="btn-sort" id="goodToBad" onClick={() => setSortGoodBad("goodToBad")}>
              Top <span>→</span>
            </div>
            <div className="btn-sort" id="badToGood" onClick={() => setSortGoodBad("badToGood")}>
              Flop <span>→</span>
            </div>
          </div>
        </form>
      </div>
      <div className="result">
        {/* pour choisir le nombre de card à afficher (par defaut c'était 20) il fait d'abord un méthode slice pour dire affiche moi le contenu du tableau de 0 à 12 (12 éléments, car 12 est un chiffre un peu magique en terme de mise en page */}
        {/* ensuite il fait la méthode map pour afficher pour chaque item du tableau le composant Card qu'on va ensuite remplir (en lui faisant passer des props) des données contenues dans le tableau moviesData. */}
        {/* ici plutôt que détaillé les props dont on a besoin une par une (en mode title, genre, etc...) on les envoie toutes en utilisant "movie" (qui est un objet contenant toutes les infos sur un film) dans une seule props global: moviedata. Moviedata contient maintenant l'objet movie avec toutes les infos sur chaque film. 
        Donc une fois qu'on a mis ça en props on a plus qu'a récupérer dans CARD l'infos dont on a besoin en particulier en disant props.movieData.title par ex si on veux le titre. */}
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movieData={movie} genreList={genreList}></Card>
          ))}
      </div>
    </div>
  );
};

export default Form;
