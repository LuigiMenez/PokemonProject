import { useState, useEffect } from "react";
import PokemonForm from "../components/PokemonForm";
import Pokemon from "../models/pokemon";
import { useParams } from "react-router";
import PokemonService from "../services/pokemonService";
import Loader from "../components/Loader";

const PokemonEdit: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      PokemonService.getPokemon(+id).then((pokemon) => setPokemon(pokemon));
    }
  }, [id]);

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Éditer {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">
          <Loader />
        </h4>
      )}
    </div>
  );
};

export default PokemonEdit;
