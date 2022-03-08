import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, getPokemons, getTypes } from "../../redux/actions";
import NavBar from "../navBar/NavBar";
import Loader from "../../img/Charizard.gif";
import s from "./CreatePokemon.module.css";

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
    img: "",
  });

  let validateName = /^[a-zA-Z\s]+$/;

  const validate = (input) => {
    let errors = {};
    if (
      !input.name.length ||
      !validateName.test(input.name) ||
      input.name.length < 3
    ) {
      errors.name =
        "This field cannot be empty. Special characters or numbers are not allowed";
    }
    if (pokemons.find((p) => p.name === input.name)) {
      errors.name = "This pokemon already exists!";
    }
    if (!input.hp || input.hp < 1) {
      errors.hp = "Number required. Must be a number between 1-255";
    }
    if (!input.attack || input.attack < 1) {
      errors.attack = "Number required. Must be a number between 1-200";
    }
    if (!input.defense || input.defense < 1) {
      errors.defense = "Number required. Must be a number between 1-250";
    }
    if (!input.speed || input.speed < 1) {
      errors.speed = "Number required. Must be a number between 1-180";
    }
    if (!input.height || input.height < 1) {
      errors.height = "Number required. Must be a number between 1-20";
    }
    if (!input.weight || input.weight < 1) {
      errors.weight = "Number required. Must be a number between 1-2000";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    e.target.value = "Select type";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.keys(errors).length === 0 &&
      input.types.length > 0 &&
      input.types.length <= 2
    ) {
      dispatch(addPokemon(input));
      alert("Pokemon created successfully!");
      setInput({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
        img: "",
      });
      history.push("/home");
    } else {
      alert("All fields must be completed");
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== e),
    });
  };

  return (
    <>
      <NavBar />
      {pokemons.length === 0 ? (
        <img
          className={s.loader}
          src={Loader}
          alt="Loading..."
          width="300px"
          height="300px"
        />
      ) : (
        <div className={s.form}>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className={s.title}>Create a Pokémon!</h2>
            <div>
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  value={input.name.trim().toLowerCase()}
                  autoComplete="off"
                  maxLength="20"
                  name="name"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Name..."
                  className={s.fields}
                />
                <p className={s.errors}>{errors.name}</p>
                <label htmlFor="img">Image: </label>
                <input
                  type="url"
                  autoComplete="off"
                  maxLength="255"
                  value={input.img}
                  name="img"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" URL Image..."
                  className={s.fields}
                />
                <br />
                <br />
                <label htmlFor="hp">HP: </label>{" "}
                <input
                  type="range"
                  value={input.hp}
                  name="hp"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" HP..."
                  className={s.stats}
                />
                {input.hp}
                <p className={s.errors}>{errors.hp}</p>
                <label htmlFor="attack">Attack: </label>{" "}
                <input
                  type="range"
                  value={input.attack}
                  name="attack"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Attack..."
                  className={s.stats}
                />
                {input.attack}
                <p className={s.errors}>{errors.attack}</p>
                <label htmlFor="defense">Defense: </label>{" "}
                <input
                  type="range"
                  value={input.defense}
                  name="defense"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Defense..."
                  className={s.stats}
                />
                {input.defense}
                <p className={s.errors}>{errors.defense}</p>
              </div>
              <div>
                <label htmlFor="speed">Speed: </label>{" "}
                <input
                  type="range"
                  value={input.speed}
                  name="speed"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Speed..."
                  className={s.stats}
                />
                {input.speed}
                <p className={s.errors}>{errors.speed}</p>
                <label htmlFor="height">Height: </label>{" "}
                <input
                  type="range"
                  value={input.height}
                  name="height"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Height..."
                  className={s.stats}
                />
                {input.height}
                <p className={s.errors}>{errors.height}</p>
                <label htmlFor="weight">Weight: </label>
                <input
                  type="range"
                  value={input.weight}
                  name="weight"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Weight..."
                  className={s.stats}
                />
                {input.weight}
                <p className={s.errors}>{errors.weight}</p>
              </div>
            </div>
            <div>
              <select
                onChange={(e) => {
                  handleSelect(e);
                }}
                className={s.selector}
              >
                <option>Select type</option>
                {types?.map((e) => {
                  return (
                    <option key={e.name} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              {
                input.types.map((e) => {
                  return (
                    <div key={e}>
                      <span>{e} </span>
                      {""}
                      <button
                        onClick={() => {
                          handleDelete(e);
                        }}
                        className={s.btn}
                      >
                        {""}x{""}
                      </button>
                    </div>
                  );
                }) //para poder ver que fui seleccionando
              }
            </div>
            <button type="submit" className={s.btn}>
              Create
            </button>
          </form>
        </div>
      )}
    </>
  );
}
