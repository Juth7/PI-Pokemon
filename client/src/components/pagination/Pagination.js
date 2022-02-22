import React from "react";
import s from "./Pagination.module.css";

export default function Pagination({ pokemonsPerPage, pokemons, pagination }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    //la división para saber cuántas páginas tendrá en total
    pages.push(i);
  }

  return (
    <div>
      {pages?.map((e) => (
        <button className={s.pagination} key={e} onClick={() => pagination(e)}>
          {e}
        </button>
      ))}
    </div>
  );
}
