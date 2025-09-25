import express from "express";
const router = express.Router(); //create a router

import model from "./func.js";

//* You NEED the following two lines if you want to treat POST/GET data as if they were stored in a JSON object (easier).
//set up the Express router to extend the URLencoded format and use JSON
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//PAGE ROUTES


//ADMIN PATHS
router.get("/admin/menu", async (request, response) => {
  let links = await model.getLinks();
  response.render("menu-list", { title: "Administer menu links", menu: links });
});
router.get("/admin/menu/add", async (request, response) => {
  let links = await model.getLinks();
  response.render("menu-add", { title: "Add menu link", menu: links });
});
router.post("/admin/menu/add/submit", async (request, response) => {
  /*
    By default form data gets sent in URLencoded format even if it's a POST submission (e.g. weight=0&path=/about&name=About)
   */
  //If it's a POST request, data is retrieved via request.body
  //If it's a GET request, data is retrieved via request.query
  //console.log(request.body);
  let newLink = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };
  await model.addLink(newLink);
  response.redirect("/admin/menu");
});
router.get("/admin/menu/delete", async (request, response) => {
  let id = request.query.linkId;
  //console.log(id);
  await model.deleteLink(id);
  response.redirect("/admin/menu");
});

export default router;