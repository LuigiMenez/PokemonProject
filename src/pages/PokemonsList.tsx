import React, { useState, useEffect, Fragment } from "react";
import Pokemon from "../models/pokemon";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";
import PokemonService from "../services/pokemonService";
/**
 * Composant pour afficher une liste de carte de Pokémon
 * @returns des cartes de Pokémon
 */
const PokemonList: React.FC = () => {
  const [nom, setNom] = useState<string>("Mes Pokémons");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  /**
   * useEffect servant a remplir le state de pokemons
   */
  useEffect(() => {
    PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons));
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h2 className="header center">{nom}</h2>
        <div className="row">
          {pokemons.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          ))}
        </div>
        <Link
          className="btn-floating btn-large waves-effect waves-light red z-depth-3"
          style={{ position: "fixed", bottom: "25px", right: "25px" }}
          to="/pokemon/add"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </Fragment>
  );
};

export default PokemonList;

/* Methode pour récupérer que le nom du pokemon plutot que tout l'objet grace au destructuring */

/* {pokemon.map(({name}) => {
        return <li key={name}>{name}</li>;
    })} */
