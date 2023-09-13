export function makeSchema(mongoose) {
  let esquemaURL;
  esquemaURL = new mongoose.Schema({
    original_url: String,
    short_url: Number,
  });

  return mongoose.model("UrlWeb", esquemaURL);
}
