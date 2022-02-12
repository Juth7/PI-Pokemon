import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  orderByAttack,
  orderByName,
  filterByType,
  filterByCreation,
  getNames,
} from "../../redux/actions";
import PokemonCard from "../pokemonCard/PokemonCard";
import Pagination from "../pagination/Pagination";
// import NavBar from "../navBar/NavBar";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const [input, setInput] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(3); //CORREGIR LA CANTIDAD DE POKEMONES EN EL PAGINADO
  const endPokemon = currentPage * pokemonsPerPage; //indice del ultimo pokemon
  const startPokemon = endPokemon - pokemonsPerPage; //indice del primer pokemon
  const currentPokemons = pokemons?.slice(startPokemon, endPokemon);
  // console.log(pokemons);

  const pagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    //Cuando inicio la página carga los pokemons
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    // console.log("lin 42", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNames(input));
    // console.log("lin 47", input);
    setCurrentPage(1);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getPokemons());
  };

  const handleTypesFilter = (e) => {
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  };

  const handleCreationFilter = (e) => {
    dispatch(filterByCreation(e.target.value));
    setCurrentPage(1);
  };

  const handleOrder = (e) => {
    dispatch(orderByName(e.target.value));
    setOrder(`Orden: ${e.target.value}`);
  };

  const handleAttack = (e) => {
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Orden: ${e.target.value}`);
  };

  return (
    <>
      {/* <NavBar /> */}
      {/* BUSCAR POKEMON */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={input}
          onChange={handleInput}
        />
        <button type="submit">Search</button>
      </form>

      {/* FILTROS Y ORDENAMIENTO  */}
      <div>
        <div>
          <select onChange={handleTypesFilter}>
            <option value="All">Filter Types</option>
            {types?.map((t) => {
              return (
                <option key={t.name} value={t.name}>
                  {t.name.toUpperCase()}
                </option>
              );
            })}
          </select>
          <select onChange={handleCreationFilter}>
            <option value="All">Filter By Creation</option>
            <option value="CreatedByUser">Created By User</option>
            <option value="Existing">Existing</option>
          </select>
          <select onChange={handleOrder}>
            <option value="All">Order By Name</option>
            <option value="asc">Order A-Z</option>
            <option value="desc">Order Z-A</option>
          </select>
          <select onChange={handleAttack}>
            <option value="All">Order By Attack</option>
            <option value="max">Attack Max/Min</option>
            <option value="min">Attack Min/Max</option>
          </select>
          <button onClick={handleClick}>Refresh Pokemons</button>
        </div>
        {/* RENDERIZADO DE TODAS LAS CARD DE POKEMON */}
        <div>
          {currentPokemons?.map((p) => (
            <PokemonCard
              key={p.id}
              name={p.name}
              img={p.img}
              type={p.type}
              id={p.id}
            />
          ))}
        </div>
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          pagination={pagination}
        />
      </div>
    </>
  );
}
