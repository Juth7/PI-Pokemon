import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { cleanDetail, getPokemonId } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import Loader from "../../img/Loader1.gif";

export default function CreatePokemon() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getPokemonId(id));
    console.log(id);
    return () => {
      dispatch(cleanDetail());
    };
  }, []);

  return (
    <div>
      <NavBar />
      {pokemonDetail.length < 0 ? (
        <img src={Loader} alt="" width="120px" height="120px" />
      ) : (
        <div>
          <h2>{pokemonDetail.name}</h2>
          <img src={pokemonDetail.img} alt="" width="350px" height="350px" />
          <div>
            {pokemonDetail.type?.map((t) => (
              <h3>{t}</h3>
            ))}
          </div>
          <div id="hp">
            HP: <progress id="hp" max="255" value={pokemonDetail.hp} />{" "}
            {pokemonDetail.hp}
          </div>
          <div id="attack">
            Attack: <progress id="hp" max="200" value={pokemonDetail.attack} />{" "}
            {pokemonDetail.attack}
          </div>
          <div id="defense">
            Defense:{" "}
            <progress id="hp" max="250" value={pokemonDetail.defense} />{" "}
            {pokemonDetail.defense}
          </div>
          <div id="height">
            Heigth: <progress id="hp" max="20" value={pokemonDetail.height} />{" "}
            {pokemonDetail.height}
          </div>
          <div id="weight">
            Weight: <progress id="hp" max="2000" value={pokemonDetail.weight} />{" "}
            {pokemonDetail.weight}
          </div>
          <div id="speed">
            Speed: <progress id="hp" max="180" value={pokemonDetail.speed} />{" "}
            {pokemonDetail.speed}
          </div>
        </div>
      )}
    </div>
  );
}
