import express from "express";
import cors from "cors";
import path from "path";
import {
  obtenerDominioDesdeURL,
  obtenerDominioDesdeURL2,
} from "./obtenerDominioDesdeURL.mjs";
import { esDominioValido } from "./esDominioValido.mjs";
import * as url from "url";
import bodyParser from "body-parser";
import { newUrl, findUrl } from "./CRUDmongoose.mjs";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.post("/api/shorturl", async function (req, res) {
  const Address = req.body.url.replace(/\/$/, "");

  if (Address === "") return res.json({ error: "invalid url" });
  const dominio = obtenerDominioDesdeURL2(Address).replace(/\/$/, "");
  esDominioValido(dominio).catch(() => res.json({ error: "invalid url" }));

  findUrl(obtenerDominioDesdeURL(Address), res);
});

app.get("/api/shorturl/:short", function (req, res) {
  const { short } = req.params;
  console.log(short);
  const element = urlsObjeto.url.find((item) => item.id == short);
  if (element === undefined) return res.json({ error: "invalid url" });

  res.redirect(element.url);
});

app.get("*", (req, res) => {
  res.send("NOT FOUND");
});
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

function verificarYAgregarUrl(object, id, url) {
  let urlExistente = object.url.find((item) => item.url === url);
  if (urlExistente) {
    return urlExistente;
  } else {
    object.url.push({ id, url });
    return object.url.find((item) => item.url === url);
  }
}
