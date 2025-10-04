import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

//set up Schema and model
const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  breed: String,
  age: Number
});
//By default, a model will be associated with a collection named as the plural form of the model name.
const Pet = mongoose.model("Pet", PetSchema);

await mongoose.connect(dbUrl); //if the connection string has a user and password, you should use await

//MONGODB FUNCTIONS
// async function connect() {
//   await mongoose.connect(dbUrl); //connect to mongodb
// }

//Function to initialize pets collection.
async function initializePets() {
  let petArray = [
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
      breed: "Japanese Spitz",
      age: 12
    }
  ];
  await Pet.insertMany(petArray);
}
//Get all pets from the pets collection
async function getPets() {
  return await Pet.find({}); //return array for find all
}
//Add one pet to the pets collection
async function addPet(petName, petType, petBreed, petAge) {
  let newPet = new Pet({
    name: petName,
    type: petType,
    breed: petBreed,
    age: parseInt(petAge)
  });
  newPet.save(); //save to the DB
}
//Add one pet using insertOne to the pets collection
async function insertPet(petName, petType, petBreed, petAge) {
  await Pet.insertOne({
    name: petName,
    type: petType,
    breed: petBreed,
    age: parseInt(petAge)
  });
}
//Update one pet name
async function updateName(oldName, newName) {
  await Pet.updateOne(
    { name: oldName },
    { name: newName }
  );
}

export default {
  initializePets,
  getPets,
  addPet,
  insertPet,
  updateName
}