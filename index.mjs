import express from "express";
import cors from "cors";
import path from "path";
import { obtenerDominioDesdeURL2 } from "./obtenerDominioDesdeURL.mjs";
import { esDominioValido } from "./esDominioValido.mjs";
import * as url from "url";
import bodyParser from "body-parser";
import { findId, findUrl } from "./CRUDmongoose.mjs";

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

  findUrl(Address, res);
});

app.get("/api/shorturl/:short", function (req, res) {
  const { short } = req.params;
  findId(short, res);
});

app.get("*", (req, res) => {
  res.send("NOT FOUND");
});
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
