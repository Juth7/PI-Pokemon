import React from "react";

export default function Pagination({ pokemonsPerPage, pokemons, pagination }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    //la división para saber cuántas páginas tendrá en total
    pages.push(i);
  }

  return (
    <div>
      <ul>
        {pages?.map((e) => (
          <button key={e} onClick={() => pagination(e)}>
            {e}
          </button>
        ))}
      </ul>
    </div>
  );
}
