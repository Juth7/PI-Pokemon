import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPokemons,
  getTypes,
  orderByAttack,
  orderByName,
  filterByType,
  filterByCreation,
} from "../../redux/actions";
import PokemonCard from "../pokemonCard/PokemonCard";
import Pagination from "../pagination/Pagination";
import Loader from "../../img/Charizard.gif";
import icon from "../../img/IconPoke.png";
import NavBar from "../navBar/NavBar";
import s from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(3); //CORREGIR LA CANTIDAD DE POKEMONES EN EL PAGINADO
  const endPokemon = currentPage * pokemonsPerPage; //indice del ultimo pokemon
  const startPokemon = endPokemon - pokemonsPerPage; //indice del primer pokemon
  const currentPokemons = pokemons?.slice(startPokemon, endPokemon); //rango de pokemones en que estamos
  // console.log(pokemons);

  const pagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    //Cuando inicio la página carga los pokemons
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

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
    <div className={s.home}>
      <NavBar />
      {/* CREAR POKEMON */}
      <button className={s.btnCreate}>
        <Link to="/create">Create Pokemon</Link>
      </button>
      {/* FILTROS Y ORDENAMIENTO  */}

      <div className={s.filters}>
        <select className={s.selector} onChange={handleTypesFilter}>
          <option value="All">Filter Types</option>
          {types?.map((t) => {
            return (
              <option key={t.name} value={t.name}>
                {t.name.toUpperCase()}
              </option>
            );
          })}
        </select>
        <select className={s.selector} onChange={handleCreationFilter}>
          <option value="All">Filter By Creation</option>
          <option value="CreatedByUser">Created By User</option>
          <option value="Existing">Existing</option>
        </select>
        <select className={s.selector} onChange={handleOrder}>
          <option value="All">Order By Name</option>
          <option value="asc">Order A-Z</option>
          <option value="desc">Order Z-A</option>
        </select>
        <select className={s.selector} onChange={handleAttack}>
          <option value="All">Order By Attack</option>
          <option value="max">Attack Max/Min</option>
          <option value="min">Attack Min/Max</option>
        </select>
        <button className={s.btnReload} onClick={handleClick}>
          <img src={icon} alt="Reload" width="18px" />
        </button>
      </div>
      {/* RENDERIZADO DE TODAS LAS CARD DE POKEMON */}
      {}
      <div className={s.Cards}>
        {!currentPokemons.length ? (
          <img
            className={s.loader}
            src={Loader}
            alt=""
            width="150px"
            height="150px"
          />
        ) : (
          currentPokemons?.map((p) => (
            <PokemonCard
              className={s.card}
              key={p.id}
              name={p.name}
              img={p.img}
              type={p.type}
              id={p.id}
            />
          ))
        )}
      </div>
      <div className={s.pagination}>
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
