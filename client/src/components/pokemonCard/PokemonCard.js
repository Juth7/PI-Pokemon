import React from "react";
import { Link } from "react-router-dom";

export default function PokemonCard({ name, type, img, id }) {
  return (
    <div>
      <div>
        <img src={img} alt="" width="80%" height="80%" />
      </div>
      <Link to={"/home/" + id}>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          {type?.map((t) => (
            <span key={t}> {t}</span>
          ))}
        </div>
      </Link>
    </div>
  );
}
