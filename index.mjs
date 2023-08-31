import express from "express";
import cors from "cors";
import path from "path";
import * as url from "url";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ optionsSuccessStatus: 200 }));

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

//app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

// app.get('/api/hello', function(req, res) {
//   res.json({ greeting: 'hello API' });
// });

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
