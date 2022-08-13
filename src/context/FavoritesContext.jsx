import React, { createContext, useState } from "react";

// init du context
export const FavoritesContext = createContext();

const FavoritesContextProvider = (props) => {
  const [favoritesList, setfavoritesList] = useState([]);

  return (
    <FavoritesContext.Provider value={{ favoritesList, setfavoritesList }}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
