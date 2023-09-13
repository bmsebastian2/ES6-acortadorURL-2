import { main } from "./mongoConexion.mjs";
import { makeSchema } from "./modeloMongo.mjs";
//import { Query } from "mongoose";
let mongoose;
main()
  .then((mong) => {
    mongoose = makeSchema(mong);
    console.log("CONEXION Y SCHEMA OK");
  })
  .catch((err) => console.log(err));

// const query = new Query();
// const queryUrl = mongoose.where({ color: "white" });

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

export function findId(shorlurl, res) {
  findShort(shorlurl)
    .then(({ original_url }) => res.redirect(original_url))
    .catch((err) => {
      res.json({
        error: "No short URL found for the given input",
      });
    });
}

function getRandomInt() {
  return Math.floor(Math.random() * 999);
}

function find(res) {
  return new Promise((resolve, reject) => {
    mongoose
      .find({
        original_url: res, // search query
      })
      .then((doc) => {
        resolve(doc[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function findShort(shorlurl) {
  return new Promise((resolve, reject) => {
    mongoose
      .find({
        short_url: shorlurl, // search query
      })
      .then((doc) => {
        resolve(doc[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
