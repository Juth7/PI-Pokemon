const axios = require("axios");
const express = require("express");
const { Pokemon, Type } = require("../db");

const router = express.Router();

const getPokemonsApi = async () => {
  try {
    const pokeApi = await axios.get("http://pokeapi.co/api/v2/pokemon");
    const next = await axios.get(pokeApi.data.next);
    const arr40 = pokeApi.data.results.concat(next.data.results);

    const data40 = arr40.map(async (d) => await axios.get(d.url)); //array promesas
    let poke40 = await Promise.all(data40).then((promise) => {
      let pokeData = promise.map((e) => e.data);
      let pokemons = pokeData.map((p) => ({
        id: p.id,
        name: p.name,
        hp: p.stats[0].base_stat,
        attack: p.stats[1].base_stat,
        defense: p.stats[2].base_stat,
        speed: p.stats[5].base_stat,
        height: p.height,
        weight: p.weight,
        type: p.types.map((t) => t.type.name),
        img: p.sprites.other.home.front_default,
      }));
      return pokemons;
    });
    return poke40;
  } catch (error) {
    console.log(error);
  }
};

const getPokemonsDb = async () => {
  return await Pokemon.findAll({
    //Busco todos los pokemon de los modelos
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const allPokemons = async () => {
  //unión de api y db
  const apiP = await getPokemonsApi();
  const dataB = await getPokemonsDb();
  const pokeAll = apiP.concat(dataB);
  return pokeAll;
};

router.get("", async (req, res) => {
  // const poke = await getPokemonsApi()
  //  res.send(poke);
  // });
  const { name } = req.query;
  const getPokemons = await allPokemons();
  if (name) {
    const searchPokemons = await getPokemons.filter((n) =>
      n.name.toLowerCase().includes(name.toLowerCase())
    );
    searchPokemons.length
      ? res.status(200).send(searchPokemons)
      : res.status(404).send("Pokemon Not Found");
  } else {
    res.status(200).send(getPokemons);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const details = await allPokemons();
if ( id ) {  const pokemonId = await details.filter((p) => p.id == id);
  pokemonId.length
    ? res.status(200).send(pokemonId)
    : res.status(404).send("Pokemon Not Found");}
});

// router.post('/', (req, res)=>{

// });

module.exports = router;
