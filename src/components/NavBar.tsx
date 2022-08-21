import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav>
      <div className="nav-wrapper teal">
        <Link to="/" className="brand-logo center">
          Pokédex
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
