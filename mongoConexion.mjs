import mongoose from "mongoose";

let uri =
  "mongodb://bmsebastian2:Ab15415958@ac-79zezp4-shard-00-00.fhwg3s0.mongodb.net:27017,ac-79zezp4-shard-00-01.fhwg3s0.mongodb.net:27017,ac-79zezp4-shard-00-02.fhwg3s0.mongodb.net:27017/?ssl=true&replicaSet=atlas-loit2h-shard-0&authSource=admin&retryWrites=true&w=majority";

export async function main() {
  return (await mongoose.connect(uri)) || false;
}
