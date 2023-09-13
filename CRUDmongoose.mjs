import { main } from "./mongoConexion.mjs";
import { makeSchema } from "./modeloMongo.mjs";
let mongoose;
main()
  .then((mong) => {
    mongoose = makeSchema(mong);
    console.log("CONEXION Y SCHEMA OK");
  })
  .catch((err) => console.log(err));

export function newUrl(original, short) {
  const newuRL = new mongoose({
    original_url: original,
    short_url: short,
  });
  newuRL
    .save()
    .then((doc) => {
      console.log("guardado");
    })
    .catch((err) => {
      console.error("error al guardar:" + err);
    });
}

export function findUrl(url, res) {
  find(url)
    .then(({ original_url, short_url }) =>
      res.json({ original_url: original_url, short_url: short_url })
    )
    .catch((err) => {
      let numRandom = getRandomInt();
      newUrl(url, numRandom);
      res.json({ original_url: url, short_url: numRandom });
    });
}

export function findId() {
  null;
}

function getRandomInt() {
  return Math.floor(Math.random() * 999);
}
