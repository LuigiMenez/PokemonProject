import Pokemon from "../models/pokemon";

export default class PokemonService {
  /**
   * Permet de récuperer
   * @returns tout les Pokémons
   */
  static getPokemons(): Promise<Pokemon[]> {
    return fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  /**
   * Permet de récuperer
   * @param id  selon l'id d'un Pokemon
   * @returns toutes les information du Pokémon
   */
  static getPokemon(id: number): Promise<Pokemon | null> {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.json())
      .then((data) => (this.isEmpty(data) ? null : data))
      .catch((error) => this.handleError(error));
  }

  /**
   * Permet de modifier
   * @param pokemon un Pokemon
   * @returns renvoie et enregistre en bdd les nouvelles valeurs du Pokémon
   */
  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: "PUT",
      body: JSON.stringify(pokemon),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static deletePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    delete pokemon.created;
    return fetch(`http://localhost:3001/pokemons`, {
      method: "POST",
      body: JSON.stringify(pokemon),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static searchPokemon(term: string): Promise<Pokemon[]> {
    return fetch(`http://localhost:3001/pokemons?q=${term}`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  // Methode pour la gestion d'erreur
  static handleError(error: Error): void {
    console.error(error);
  }
}
