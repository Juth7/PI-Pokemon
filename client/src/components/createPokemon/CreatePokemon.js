import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, getTypes } from "../../redux/actions";
import NavBar from "../navBar/NavBar";

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [input, setInput] = useState({
    img: "",
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  return (
    <div>
      <NavBar />
      <main>
      <form method="post">
        <label></label>
        <input type="text" name="" value={} placeholder="o"/>
        <label></label>
        <input type="text" name="" value={} placeholder="o"/>
        <label></label>
        <input type="text" name="" value={} />
        <label></label>
        <input type="range" name="" value={} />
        <label></label>
        <input type="range" name="" value={} />
        <label></label>
        <input type="range" name="" value={} />
        <label></label>
        <input type="range" name="" value={} />
        <label></label>
        <input type="range" name="" value={} />
        <label></label>
        <input type="range" name="" value={} />
        <label></label>
        <input type="text" name="" value={} placeholder="o"/>
      </form>
      </main>
    </div>
  );
}
