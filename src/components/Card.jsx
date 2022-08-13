import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";


const Card = ({ movieData, genreList }) => {
  // *************** Logic part ***************
  const { favoritesList, setfavoritesList } = useContext(FavoritesContext);

  // fonction pour reformater la date : on utilise le destructuring et la méthode split. Ce qui va découper notre string en variable à chaque fois que JS rencontrera le charactère "-".
  //Ainsi notre string "2021-09-03" sera découpé en 3 variables que l'on pourra remettre dans l'ordre que l'on veux
  //la méthode join permet de placer un charactère entre les éléments d'un tableau.
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const findGenre = (dataGenre, movieGenreID) => {
    let resultofGenre = [];
    movieGenreID.forEach((id) => {
      const indexOfGenre = dataGenre.map((object) => object.id).indexOf(id);
      if (indexOfGenre > -1) {
        resultofGenre.push(dataGenre[indexOfGenre].name);
      }
    });
    // retient bien cette partie affichage du resultat bordel
    return resultofGenre.map((genre) => <li key={genre}>{genre}</li>);
  };

  //   !!!!!!!!!!!!!!! MEGA IMPORTANT - AFFICHER LE CONTENU D'UN TABLEAU DANS DES LI EN REACT
  // Il suffit d'utiliser la méthode .map cette méthode permet d'afficher le contenu d'un tableau ligne par ligne
  // voilà comment on return le contenu d'un tableau élément par élément pour l'afficher dans len react. Il faut faire un .map !!!!!!!
  //   const test = () => {

  //     const fruits = ["pomme", "fraise", "kiwi"]

  //     return fruits.map(fruit => <li>{fruit}</li>)

  //   };

  const addStorage = () => {
    const newFAvorites = [...favoritesList]
    if(!newFAvorites.includes(movieData.id.toString())) {
      newFAvorites.push(movieData.id.toString())
      setfavoritesList(newFAvorites)
    } 

    // ****************** méthode localstorage****************
    // // d'abord on test si le localStorage de l'utilisateur est vide. Si il est pas vide alors on peux ajouter les coups de coeur (movieData.id) au local storage via un une méthode de tableau split. Sinon tu créés un tableau vide dans lequel on va mettre le 1er coup de coeur.
    // let storedData = favoritesList
    //   ? // Si localstorage contient déjà quelque chose donc une string alors split la string à chaque fois qu'il y a une virgule et créé un tableau
    //     window.localStorage.movies.split(",")
    //   : [];
    // // on ajoute l'id à notre tableau si il n'y est pas déjà
    // if (!storedData.includes(movieData.id.toString())) {
    //   storedData.push(movieData.id);
    //   // on stock notre tableau mis à jour dans le local storage
    //   window.localStorage.movies = storedData;
    // } else {
    //   // console.log("déjà ajouté");
    // console.log(storedData);

    // }

  };

  const deleteStorage = () => {
    console.log(movieData.id.toString());
    // const deletedMoviesArray = favoritesList.filter(item => item != movieData.id.toString() )
    const deletedMoviesArray = favoritesList.filter(item => item !== movieData.id.toString() )
    
    setfavoritesList(deletedMoviesArray)



    // let storedData = window.localStorage.movies.split(",");
    // // là on filtre pour suprimer le film dont on à l'id
    // let newData = storedData.filter((id) => id != movieData.id);
    // window.localStorage.movies = newData;
    // // ici notre probblème c'est que quand on supprime un coup de coeur les card ne se mette pas à jour en live en se supprimant.
    // // Parce qu'en fait on aurait du non pas utiliser le localstorage pour stocker les favoris mais un un state que l'on aurait utilisé en props accessible partout dans notre app avec Apicontext ou Redux.
    // // Comme on a pas utiliser une de ces méthodes et un state notre page coup de coeur ne se met pas à jour on doit faire un truc dégeulasse qui est de recharger la page à courante à chauqe fois avec un reload !
    // window.location.reload();
    // console.log(newData);
  };

  // ***************Screen part ***************
  return (
    <div className="card">
      {/* ici on a du chercher dans la doc de l'api comment afficher une image avec l'API on avait besoin de d'abord mettre le début de l'url en fixe ce qu'on à fait ici */}
      {/* ATTENTION !!!  en react si on veux ajouter des image via balise img : il faut stocker l'image dans le dossier PUBLIC de react et le chemin d'accès sera juste ./nomDuDossier/nomDuFichier.jpeg pas besoin de remonter avec des ../ ../*/}
      {/* ATTENTION 2 : si vous ajouter une image pour la mettre en CSS par exemple dans un background image là le fichier image devra être stocker dans le dossier SRC de votre appli react */}
      <img
        src={
          movieData.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movieData.poster_path
            : "./img/poster.jpg"
        }
        alt=""
      />

      <h2>{movieData.title}</h2>
      {/* pour la date il arrive que les films n'ont pas de date. Donc il faut faire une ternaire pour d'abord tester si la date existe et si oui l'afficher.  */}
      {movieData.release_date ? (
        <h5>sortie le : {dateFormater(movieData.release_date)} </h5>
      ) : (
        ""
      )}

      {movieData.vote_average ? (
        <h4>
          note : {movieData.vote_average}/10 <span>⭐</span>
        </h4>
      ) : (
        ""
      )}
      {/* on fait un affichage conditionnel sur le bouton ajouter coup de coeur. On sait qu'il y a une différence entre les deux pages home et coupe de coeur. La différence c'est que quand on est sur la page coup de coeur l'api nous renvoi pas les même donné sur le genre. Elle nous donne movieData.genre_ids sur la home et autre chose sur la page coup de coeur.  */}
      {/* dons on peux vérifier si movieData.genre_ids est bien existant. Si oui ça veux dire qu'on est sur la page home et que l'api est venu récup la data qu'il faut sinon ça veux dire qu'on est sur la page coup de coeur. */}
      {movieData.genre_ids ? (
        <div className="btn" onClick={() => addStorage()}>
          Ajouter au coup de coeur
        </div>
      ) : (
        <div className="btn" onClick={() => deleteStorage()}>
          Supprimer le coup de coeur
        </div>
      )}

      <ul>
        {movieData.genre_ids
          ? findGenre(genreList, movieData.genre_ids)
          : movieData.genres.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
      </ul>
      {movieData.overview ? <p>{movieData.overview}</p> : ""}
    </div>
  );
};

export default Card;
