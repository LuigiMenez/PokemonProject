import Pokemon from "../models/pokemon";
import formatType from "../helpers/formatType";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import PokemonService from "../services/pokemonService";

type Props = {
  pokemon: Pokemon;
  isEditForm: boolean;
};

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  picture: Field;
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
};

const PokemonForm: React.FC<Props> = ({ pokemon, isEditForm }) => {
  const [form, setForm] = useState<Form>({
    picture: { value: pokemon.picture },
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
  });

  const navigate = useNavigate();
  const types: string[] = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  //Fonction pour faire un composant controler, pour les champs name, hp, et cp
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = evt.target.name;
    const fieldValue: string = evt.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const isAddForm = () => {
    return !isEditForm;
  };

  // Fonction pour faire un composant controlé sur les checkbox
  const selectType = (
    type: string,
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checked = evt.target.checked;
    let newField: Field;

    if (checked) {
      // Si l'utilisateur coche un type, à l'ajoute à la liste des types du pokémon.
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
      const newTypes: string[] = form.types.value.filter(
        (currentType: string) => currentType !== type
      );
      newField = { value: newTypes };
    }

    setForm({ ...form, ...{ types: newField } });
  };

  //Fonction pour valider mon formulaire, envoyer les donner du Pokémon en bdd
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    pokemon.picture = form.picture.value;
    pokemon.name = form.name.value;
    pokemon.hp = form.hp.value;
    pokemon.cp = form.cp.value;
    pokemon.types = form.types.value;
    // Ternaire pour decider de la méthode à appliquer selon si on est en mode création ou édition
    isEditForm ? upDatePokemon() : addPokemon();
  };

  //Fonction pour ajouter un Pokémon
  const addPokemon = () => {
    PokemonService.addPokemon(pokemon).then(() => navigate(`/`));
  };

  //Fonction pour mettre à jour les donnée d'un Pokémon.
  const upDatePokemon = () => {
    PokemonService.updatePokemon(pokemon).then(() =>
      navigate(`pokemon/${pokemon.id}`)
    );
  };

  //Fonction pour supprimer une Pokemon
  const deletePokemon = () => {
    PokemonService.deletePokemon(pokemon).then(() => navigate(`/`));
  };

  return (
    <form onSubmit={(evt) => handleSubmit(evt)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {/* On affiche l'image du Pokémon seulement si on est en mode éditions */}
            {isEditForm && (
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: "250px", margin: "0 auto" }}
                />
                <span className="btn-floating halfway-fab waves-effect waves-light">
                  <i onClick={deletePokemon} className="material-icons">
                    delete
                  </i>
                </span>
              </div>
            )}

            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                {/* On affiche le champs pour ajouter l'url menant à l'image seulement en mode création */}
                {isAddForm() && (
                  <div className="form-group">
                    <label htmlFor="name">Image</label>
                    <input
                      id="picture"
                      name="picture"
                      value={form.picture.value}
                      type="text"
                      className="form-control"
                      onChange={(evt) => handleInputChange(evt)}
                    ></input>
                  </div>
                )}

                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name.value}
                    type="text"
                    className="form-control"
                    onChange={(evt) => handleInputChange(evt)}
                  ></input>
                </div>

                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input
                    id="hp"
                    name="hp"
                    value={form.hp.value}
                    type="number"
                    className="form-control"
                    onChange={(evt) => handleInputChange(evt)}
                  ></input>
                </div>

                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    name="cp"
                    value={form.cp.value}
                    type="number"
                    className="form-control"
                    onChange={(evt) => handleInputChange(evt)}
                  ></input>
                </div>

                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          id={type}
                          value={type}
                          checked={hasType(type)}
                          type="checkbox"
                          className="filled-in"
                          onChange={(evt) => selectType(type, evt)}
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
