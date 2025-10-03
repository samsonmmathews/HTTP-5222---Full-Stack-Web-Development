import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

//set up Schema and model
const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number
});
const Pet = mongoose.model("Pet", PetSchema);

await mongoose.connect(dbUrl);

// //MONGODB FUNCTIONS
// async function connect() {
//   await mongoose.connect(dbUrl); //connect to mongodb
// }

// Function to initialize pets collection
async function initializePets() {
  let petList = [
    {
      name: "Max",
      type: "cat",
      breed: "Maine Coon",
      age: 5
    },
    {
      name: "Bruno",
      type: "dog",
      breed: "Siberian Husky",
      age: 2
    },
    {
      name: "Rolex",
      type: "dog",
      breed: "Japanese Spitx",
      age: 12
    }
  ];
  await Pet.insertMany(petList);
}
//Get all pets from the pets collection
async function getPets() {
  return await Pet.find({}); //return array for find all
}


export default {
  initializePets,
  getPets
}