import { useState } from "react";
import Pokemon from "../models/pokemon";
import formatDate from "../helpers/formatDate";
import formatType from "../helpers/formatType";
import "./PokemonCard.css";

/**
 * Typage des props
 */
type Props = {
  pokemon: Pokemon;
  borderColor?: string;
};

/**
 * On crée un composant devant nous afficher une carte de pokemon
 * @param param0 props devant recevoir les donnée du pokemon, borderColor props avec une valeur par defaut
 * @returns une carte de pokemon
 */
const PokemonCard: React.FC<Props> = ({ pokemon, borderColor = "#009688" }) => {
  const [color, setColor] = useState<string>();

  // Fonction changeant la variable color que l'on appelera quand la souris survolera une carte
  const showBorder = () => {
    setColor(borderColor);
  };

  // Fonction changeant la variable color que l'on appelera quand la souris sortira d'une carte
  const hideBorder = () => {
    setColor("#f5f5f5");
  };

  return (
    <div
      className="col s6 m4"
      onMouseEnter={showBorder}
      onMouseLeave={hideBorder}
    >
      <div className="card horizontal" style={{ borderColor: color }}>
        <div className="card-image">
          <img src={pokemon.picture} alt={pokemon.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p>
              <small>{formatDate(pokemon.created)}</small>
              {pokemon.types.map((type) => (
                <span key={type} className={formatType(type)}>
                  {type}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
