import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_NAMES = "GET_NAMES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_CREATION = "FILTER_CREATION";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      await fetch("https://juth-poke.herokuapp.com/pokemons")
        .then((response) => response.json())
        .then(async (data) => {
          // console.log(data);
          await dispatch({ type: GET_POKEMONS, payload: data, loading: false });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getNames = (name) => {
  console.log("name act", name);
  return async (dispatch) => {
    try {
      const json = await axios(`https://juth-poke.herokuapp.com/pokemons?name=${name}`);
      // console.log("names act", json.data);
      return dispatch({ type: GET_NAMES, payload: json.data });
    } catch (error) {
      console.log(error);
      // alert("Pokemon Not Found");
    }
  };
};

export const getPokemonId = (id) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`https://juth-poke.herokuapp.com/pokemons/${id}`);
      console.log("action id", json.data);
      return dispatch({ type: GET_DETAILS, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("https://juth-poke.herokuapp.com/types");
      return dispatch({ type: GET_TYPES, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPokemon = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://juth-poke.herokuapp.com/pokemons",
        payload
      );
      return dispatch({ type: POST_POKEMONS, payload: response });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePokemon = (id) => {
  return async (dispatch) => {
    try {
      const json = await axios.delete(
        `https://juth-poke.herokuapp.com/pokemons/delete/${id}`
      );
      return dispatch({ type: "DELETE_POKEMON", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanDetail = () => {
  return {
    type: GET_DETAILS,
    payload: [],
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_TYPES,
    payload,
  };
};

export const filterByCreation = (payload) => {
  return { type: FILTER_CREATION, payload };
};

export const orderByName = (payload) => ({
  type: ORDER_BY_NAME,
  payload,
});

export const orderByAttack = (payload) => ({
  type: ORDER_BY_ATTACK,
  payload,
});
