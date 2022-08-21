import { useState } from "react";
import { Link } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemonService";

const SearchPokemon: React.FC = () => {
  const [term, setTerm] = useState<string>("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // Fonction pour controlée le champ de recherche
  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const term = evt.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setPokemons([]);
      return;
    }

    // Appel à notre service
    PokemonService.searchPokemon(term).then((pokemons) =>
      setPokemons(pokemons)
    );
  };

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card">
          <div className="card-content">
            <div className="input-field">
              <input
                type="text"
                placeholder="Rechercher un pokémon"
                value={term}
                onChange={handleInputChange}
              />
            </div>
            <div className="collection">
              {pokemons.map((pokemon) => (
                <Link
                  key={pokemon.id}
                  to={`/pokemon/${pokemon.id}`}
                  className="collection-item"
                >
                  {pokemon.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPokemon;
