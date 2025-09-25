import express from 'express';
const pageRouter = express.Router(); //create a router

import model from '../menuLinks/func.js';

//HOME PAGE
//To render the index page, you render the "index" template based on an incoming request to the "/" path.
router.get("/", async (request, response) => {
  let links = await model.getLinks();
  //console.log(links);
  response.render("index", { title: "Home", menu: links });
});
//ABOUT PAGE
router.get("/about", async (request, response) => {
  let links = await model.getLinks();
  response.render("about", { title: "About", menu: links });
});

export default pageRouter;