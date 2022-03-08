import {
  GET_POKEMONS,
  GET_NAMES,
  GET_DETAILS,
  GET_TYPES,
  POST_POKEMONS,
  FILTER_TYPES,
  FILTER_CREATION,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
} from "../actions";

const initialState = {
  allPokemons: [],
  pokemons: [],
  alpha: [],
  created: [],
  oNames: [],
  oAttack: [],
  detail: [],
  types: [],
  isLoading: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        alpha: action.payload,
        created: action.payload,
        oNames: action.payload,
        oAttack: action.payload,
        allPokemons: action.payload,
        isLoading: action.loading,
      };
    case GET_NAMES:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_DETAILS:
      console.log("reducer id", action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case POST_POKEMONS:
      return {
        ...state,
      };
    case FILTER_TYPES:
      const allPokemonTypes = state.alpha;
      const filterType =
        action.payload === "All"
          ? allPokemonTypes
          : allPokemonTypes.filter((p) => p.type.includes(action.payload));

      console.log("type", filterType);
      return {
        ...state,
        pokemons: filterType,
      };
    case FILTER_CREATION:
      const allPokemonCreations = state.created;
      const filterCreation =
        action.payload === "createdByUser"
          ? allPokemonCreations.filter((p) => p.createdByUser) //filtro por atributo de db
          : allPokemonCreations.filter((p) => !p.createdByUser);
      return {
        ...state,
        pokemons: filterCreation,
      };
    case ORDER_BY_NAME:
      const orderNames =
        action.payload === "All"
          ? state.oNames
          : action.payload === "asc"
          ? state.oNames.sort((a, b) => {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            })
          : state.oNames.sort((a, b) => {
              return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
      return {
        ...state,
        pokemons: orderNames,
      };
    case ORDER_BY_ATTACK:
      const orderAttack =
        action.payload === "All"
          ? state.oAttack
          : action.payload === "max"
          ? state.oAttack.sort((a, b) => {
              return b.attack - a.attack;
            })
          : state.oAttack.sort((a, b) => {
              return a.attack - b.attack;
            });
      return {
        ...state,
        pokemons: orderAttack,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
