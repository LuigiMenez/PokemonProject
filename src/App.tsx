import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PageNotFound from "./pages/PageNotFound";
import PokemonAdd from "./pages/PokemonAdd";
import PokemonsDetail from "./pages/PokemonDetail";
import PokemonEdit from "./pages/PokemonEdit";
import PokemonList from "./pages/PokemonsList";

const App: React.FC = () => {
  return (
    <Fragment>
      {/* La barre de navigation commune à toutes les pages */}
      <NavBar />
      {/* Les chemins menant à toutes les pages */}
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="pokemon/:id" element={<PokemonsDetail />} />
        <Route path="pokemon/edit/:id" element={<PokemonEdit />} />
        <Route path="pokemon/add" element={<PokemonAdd />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Fragment>
  );
};

export default App;
