import { useState } from "react";
import PokemonForm from "../components/PokemonForm";
import Pokemon from "../models/pokemon";

//Composant pour créer un nouveau Pokémon
const PokemonAdd: React.FC = () => {
  // Crée un state id qui generera un id à partir de la date
  const [id] = useState<number>(new Date().getTime());

  // Création d'une instance vierge de Pokemon
  const [pokemon] = useState<Pokemon>(new Pokemon(id));

  return (
    <div className="row">
      <h2 className="header center">Ajouter un Pokémon</h2>

      {/* On rappel notre formulaire, avec les donnée de notre Pokémon vierge */}
      <PokemonForm pokemon={pokemon} isEditForm={false}></PokemonForm>
    </div>
  );
};

export default PokemonAdd;
