import express from "express";
import cors from "cors";
import path from "path";
import dns from "dns";
import {
  obtenerDominioDesdeURL2,
  obtenerDominioDesdeURL,
} from "./obtenerDominioDesdeURL.mjs";
import { esDominioValido } from "./esDominioValido.mjs";
import * as url from "url";
import bodyParser from "body-parser";

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

// const options = {
//   family: 6,
//   hints: dns.ADDRCONFIG | dns.V4MAPPED,
// };
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
let objectShort = {
  2: {
    url: "hhhtp:akslskdlks",
  },
};
//app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.post("/api/shorturl", function (req, res) {
  const Address = req.body.url;
  if (Address === "") return res.json({ error: "invalid url" });
  const shorUrl = getRandomInt(9999);

  const dominio = obtenerDominioDesdeURL2(Address).replace(/\/$/, "");
  console.log(dominio);

  esDominioValido(dominio)
    .then(() => {
      //console.log(`El dominio ${dominio} es válido.`);
      let object = { [`${shorUrl}`]: { url: Address.replace(/\/$/, "") } };
      objectShort = object;
      res.json({
        original_url: Address.replace(/\/$/, ""),
        short_url: shorUrl,
      });
    })
    .catch(() => {
      // console.error(
      //   `El dominio ${dominio} no es válido o no se pudo resolver.`
      // );
      res.json({ error: "invalid url" });
    });
});

app.get("/api/shorturl/:short", function (req, res) {
  const { short } = req.params;

  res.redirect(objectShort[short].url);
});

app.get("*", (req, res) => {
  res.send("NOT FOUND");
});
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
