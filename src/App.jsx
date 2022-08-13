import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import FavoritesContextProvider from "../src/context/FavoritesContext";

function App() {
  return (
    <FavoritesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/coup-de-coeur" element={<UserList />}></Route>
          {/* ici c'est la page qui équivaut à la 404. en fait on renvoit vers la home. */}
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </FavoritesContextProvider>
  );
}

export default App;
