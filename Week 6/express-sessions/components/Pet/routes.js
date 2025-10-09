import express from "express";
const router = express.Router();

import pets from "./controller.js";

router.get("/", pets.getAllPets);

export default router;