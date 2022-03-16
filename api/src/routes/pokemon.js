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
        attack: p.stats[1].base_stat,
        type: p.types.map((t) => t.type.name),
        img: p.sprites.other.home.front_default,
      }));
      // console.log("pokemons", pokemons);
      return pokemons;
    });
    return poke40;
  } catch (error) {
    console.log(error);
  }
};

const getPokemonsDb = async () => {
  const pokeDb = await Pokemon.findAll({
    //Busco todos los pokemon de los modelos
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return pokeDb.map((e) => {
    return {
      id: e.id,
      name: e.name,
      attack: e.attack,
      type: e.types.map((t) => t.name),
      img: e.img,
      createdByUser: e.createdByUser,
    };
  });
};

const allPokemons = async () => {
  //unión de api y db
  try {
    const apiP = await getPokemonsApi();
    const dataB = await getPokemonsDb();
    const pokeAll = [...apiP, ...dataB];
    // console.log("api", apiP);
    return pokeAll;
  } catch (error) {
    console.log(error);
  }
};

const getApiName = async (name) => {
  try {
    const apiName = await axios.get(`http://pokeapi.co/api/v2/pokemon/${name}`);
    const names = apiName.data;
    return [
      {
        id: names.id,
        name: names.name,
        type: names.types.map((t) => t.type.name),
        img: names.sprites.other.home.front_default,
        attack: names.stats[1].base_stat,
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

const getPokemonsName = async (name) => {
  try {
    const dbNames = await Pokemon.findAll({
      where: { name: { [Op.iLike]: "%" + name + "%" } },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const filtroName = dbNames.map((n) => {
      return {
        id: n.id,
        name: n.name,
        type: n.types.map((t) => t.name),
        img: n.img,
        attack: n.attack,
        createdByUser: n.createdByUser,
      };
    });
    return filtroName;
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const totalPokemons = await allPokemons();
    if (!name) return res.send(totalPokemons);
    const apiN = await getApiName(name);
    if (apiN) return res.send(apiN);
    const dbN = await getPokemonsName(name);
    if (dbN) return res.send(dbN);
    return res.status(404).send({ msg: "Pokemon Not Found" });
  } catch (error) {
    console.log(error);
  }
});

const getIdApi = async (id) => {
  try {
    const apiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const IdDetails = apiId.data;
    return {
      id: IdDetails.id,
      name: IdDetails.name,
      hp: IdDetails.stats[0].base_stat,
      attack: IdDetails.stats[1].base_stat,
      defense: IdDetails.stats[2].base_stat,
      speed: IdDetails.stats[5].base_stat,
      height: IdDetails.height,
      weight: IdDetails.weight,
      type: IdDetails.types.map((t) => t.type.name),
      img: IdDetails.sprites.other.home.front_default,
    };
  } catch (error) {
    console.log(error);
  }
};

const getIdDb = async (id) => {
  try {
    const findIdDb = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return {
      id: findIdDb.id,
      hp: findIdDb.hp,
      name: findIdDb.name,
      attack: findIdDb.attack,
      defense: findIdDb.defense,
      speed: findIdDb.speed,
      height: findIdDb.height,
      weight: findIdDb.weight,
      type: findIdDb.types.map((t) => t.name),
      img: findIdDb.img,
      createdByUser: findIdDb.createdByUser,
    };
  } catch (error) {
    console.log(error);
  }
};

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fromApi = await getIdApi(id);
    if (fromApi) return res.send(fromApi);
    const fromDb = await getIdDb(id);
    if (fromDb) return res.send(fromDb);
    return res.status(404).send({ msg: "Pokemon Not Found" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      hp,
      img,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      createdByUser,
    } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      hp,
      img:
        img ||
        "https://www.pngall.com/wp-content/uploads/4/Pokeball-Transparent.png",
      // "https://gamegraduate.com/wp-content/uploads/2021/08/pokemon-1513925-removebg-preview.png",
      attack,
      defense,
      speed,
      height,
      weight,
      createdByUser,
    });
    const typePokemon = await Type.findAll({
      where: { name: types },
    });

    newPokemon.addType(typePokemon);

    // return res.status(200).send("Pokemon created succesfully!");
    return res.send(newPokemon);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Pokemon.destroy({
        where: { id: id },
      });
    }
    return res.send({ msg: "Pokemon deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
