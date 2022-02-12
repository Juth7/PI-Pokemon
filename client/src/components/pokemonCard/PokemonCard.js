import React from "react";
import { Link } from "react-router-dom";

export default function PokemonCard({ name, type, img, id }) {
  return (
    <Link to={"/detail/" + id}>
      <div>
        <h3>{name}</h3>
      </div>
      <div>
        {type?.map((t) => (
          <h5 key={t}>{t}</h5>
        ))}
      </div>
      <div>
        <img src={img} alt={name} width="200px" height="200px" />
      </div>
    </Link>
  );
}