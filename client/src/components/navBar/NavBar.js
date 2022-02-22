import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import homeImg from "../../img/PokeBlue.png";
import { getNames } from "../../redux/actions";
import s from "./NavBar.module.css";

function NavBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    // console.log("lin 42", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNames(input));
    // console.log("lin 47", input);
  };

  return (
    <div className={s.navBar}>
      <div className={s.logo}>
        <Link to="/">
          <img src={Logo} alt="" height="150px" width="150px" />
        </Link>
      </div>
      <div className={s.searchDiv}>
        {/* BUSCAR POKEMON */}
        <label className={s.search}>Search</label>
        <form onSubmit={handleSubmit}>
          <input
            className={s.bar}
            type="text"
            placeholder="    Type a Pokemon here..."
            value={input}
            onChange={handleInput}
          />
        </form>
      </div>
      <div className={s.home}>
        <Link to="/home">
          <img src={homeImg} alt="Home" width="53px" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
