import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, getTypes } from "../../redux/actions";
import styles from "./CreatePokemon.module.css";

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    img: "",
  });

  let validateName = /^[a-zA-Z\s]+$/;
  let validateUrl = /^(http|https):\/\/[^ "]+$/;

  const validate = (input) => {
    let errors = {};
    if (
      !input.name ||
      !validateName.test(input.name) ||
      input.name.length < 3
    ) {
      errors.name =
        "This field cannot be empty. Special characters or numbers are not allowed";
    }
    if (!validateUrl.test(input.img)) {
      errors.img = "URL required";
    }
    if (!input.hp || input.hp < 1 || input.hp > 255) {
      errors.hp = "Number required. Must be a number between 1-255";
    }
    if (!input.attack || input.attack < 1 || input.attack > 200) {
      errors.attack = "Number required. Must be a number between 1-200";
    }
    if (!input.defense || input.defense < 1 || input.defense > 250) {
      errors.defense = "Number required. Must be a number between 1-250";
    }
    if (!input.speed || input.speed < 1 || input.speed > 180) {
      errors.speed = "Number required. Must be a number between 1-180";
    }
    if (!input.height || input.height < 1 || input.height > 20) {
      errors.height = "Number required. Must be a number between 1-20";
    }
    if (!input.weight || input.weight < 1 || input.weight > 2000) {
      errors.wight = "Number required. Must be a number between 1-2000";
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
    if (input.types.length < 2) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      e.target.value = "Select type";
    } else {
      alert("More than 2 types are not allowed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !errors.name &&
      !errors.hp &&
      !errors.attack &&
      !errors.defense &&
      !errors.speed &&
      !errors.height &&
      !errors.weight &&
      !errors.img &&
      input.name.length &&
      input.types.length < 2
    ) {
      dispatch(addPokemon(input));
      alert("Pokemon created successfully!");
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
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

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>Create a Pokémon!</h2>
        <div>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Name"
            />
            <p>{errors.name}</p>
            <label>Image: </label>
            <input
              value={input.img}
              name="img"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="URL Image..."
            />
            <p>{errors.img}</p>
            <label>HP: </label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="HP"
            />
            {input.hp}
            <p>{errors.hp}</p>
            <label>Attack: </label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Attack"
            />
            {input.attack}
            <p>{errors.attack}</p>
            <label>Defense: </label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Defense"
            />
            {input.defense}
            <p>{errors.defense}</p>
          </div>
          <div>
            <label>Speed: </label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Speed"
            />
            {input.speed}
            <p>{errors.speed}</p>
            <label>Height: </label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Height"
            />
            {input.height}
            <p>{errors.height}</p>
            <label>Weight: </label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Weight"
            />
            {input.weight}
            <p>{errors.weight}</p>
          </div>
        </div>
        <div>
          <select
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option>Select type</option>
            {types?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <p>{errors.types}</p>
          {
            input.types.map((e) => {
              return (
                <div key={e}>
                  <p>{e}</p>
                  <button
                    onClick={() => {
                      handleDelete(e);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            }) //para poder ver que fui seleccionando
          }
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
