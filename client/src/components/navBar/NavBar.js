import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { getNames } from "../../redux/actions";

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
    <div className="navbar">
      <div className="titleNav">
        <Link to="/">
          <img src={Logo} alt="" height="60px" width="170px" />
        </Link>
      </div>
      {/* BUSCAR POKEMON */}
      <label>Search</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a Pokemon here..."
          value={input}
          onChange={handleInput}
        />
      </form>
      <div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
}

export default NavBar;
