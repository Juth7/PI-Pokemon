import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import PokemonDetail from "./components/pokemonDetail/PokemonDetail";
import CreatePokemon from "./components/createPokemon/CreatePokemon";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={PokemonDetail} />
      <Route exact path="/create" component={CreatePokemon} />
    </div>
  );
}

export default App;
