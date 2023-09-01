import express from "express";
import cors from "cors";
import path from "path";
import dns from "dns";

import * as url from "url";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ optionsSuccessStatus: 200 }));
const options = {
  // Setting family as 6 i.e. IPv6
  // family: 6,
  // hints: dns.ADDRCONFIG | dns.V4MAPPED,
  all: true,
};
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
  const ipAddres = req.body.url;
  const shorUrl = getRandomInt(99);
  // objectShort.id = ipAddres;
  // objectShort[ipAddres].url = shorUrl;
  //console.log(shorUrl);
  //console.log(objectShort);
  //console.log(objectShort["2"]);
  let object = { [`${shorUrl}`]: { url: ipAddres } };
  objectShort = object;
  //console.log(objectShort);

  //console.log(ipAddres);
  dns.lookup(ipAddres, options, (err, address, family) =>
    res.json(
      err
        ? { error: "invalid url" }
        : { original_url: ipAddres, short_url: shorUrl }
    )
  );
});
app.get("/api/shorturl/:short", function (req, res) {
  const { short } = req.params;
  console.log(short);
  console.log(objectShort);
  console.log(objectShort[short].url);
  res.redirect(objectShort[short].url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
