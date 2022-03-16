import React from "react";
import { Link } from "react-router-dom";
import s from "./PokemonCard.module.css";

export default function PokemonCard({ name, type, img, id }) {
  return (
    <div>
      <div>
        <img src={img} alt="" width="80%" height="80%" className={s.img} />
      </div>
      <Link className={s.cardDet} to={"/home/" + id}>
        <h3 className={s.name}>{name[0].toUpperCase() + name.slice(1)}</h3>
        {type?.map((t) => (
          <span className={s.types} key={t}>
            {" "}
            {t[0].toUpperCase() + t.slice(1)}
          </span>
        ))}
      </Link>
    </div>
  );
}
