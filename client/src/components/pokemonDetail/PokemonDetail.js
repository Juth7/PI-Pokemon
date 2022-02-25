import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { cleanDetail, getPokemonId, deletePokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import Loader from "../../img/Loader1.gif";
import s from "./PokemonDetail.module.css";

export default function CreatePokemon() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const pokemonDetail = useSelector((state) => state.detail);
  console.log("detail", pokemonDetail.createdByUser);

  useEffect(() => {
    dispatch(getPokemonId(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    const sure = window.confirm(
      "Are you sure you want to delete your pokemon?"
    );
    if (sure) {
      dispatch(deletePokemon(id));
      history.push("/home");
    }
  };

  return (
    <>
      <NavBar />
      <div className={s.detailCard}>
        {getPokemonId.length < 0 ? (
          <img src={Loader} alt="" width="120px" height="120px" />
        ) : (
          <div className={s.name}>
            <h2>{pokemonDetail.name}</h2>
            <img src={pokemonDetail.img} alt="" width="300px" height="300px" />
            <div className={s.types}>
              {pokemonDetail.type?.map((t) => (
                <h3 key={t}>{t}</h3>
              ))}
            </div>
            <div id="id">
              Id: <span>{pokemonDetail.id}</span>
            </div>
            <div>
              <div id="hp">
                HP:{" "}
                <progress
                  id="hp"
                  max="255"
                  value={pokemonDetail.hp}
                  className={s.stat}
                />{" "}
                {pokemonDetail.hp}
              </div>
              <div id="attack">
                Attack:{" "}
                <progress
                  id="attack"
                  max="190"
                  value={pokemonDetail.attack}
                  className={s.stat}
                />{" "}
                {pokemonDetail.attack}
              </div>
              <div id="defense">
                Defense:{" "}
                <progress
                  id="defense"
                  max="250"
                  value={pokemonDetail.defense}
                  className={s.stat}
                />{" "}
                {pokemonDetail.defense}
              </div>
              <div id="height">
                Heigth:{" "}
                <progress
                  id="height"
                  max="20"
                  value={pokemonDetail.height}
                  className={s.stat}
                />{" "}
                {pokemonDetail.height}
              </div>
              <div id="weight">
                Weight:{" "}
                <progress
                  id="weight"
                  max="2000"
                  value={pokemonDetail.weight}
                  className={s.stat}
                />{" "}
                {pokemonDetail.weight}
              </div>
              <div id="speed">
                Speed:{" "}
                <progress
                  id="speed"
                  max="200"
                  value={pokemonDetail.speed}
                  className={s.stat}
                />{" "}
                {pokemonDetail.speed}
              </div>
            </div>

            {pokemonDetail.createdByUser && (
              <button className={s.btnDelete} onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
