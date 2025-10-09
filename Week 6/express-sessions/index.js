import "dotenv/config";
import express from "express";
import path from "path"; //needed when setting up static/file paths
import sessions from "express-session";
import { connect } from "./db.js";

//import routers
import router from "./components/Pet/routes.js";
import userRouter from "./components/User/routes.js";

//connect to DB immediately
connect();

const __dirname = import.meta.dirname;

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//set up app to use sessions
app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessID",
    saveUninitialized: false,
    resave: false,
    cookie: {}
  })
);

//set up middleware function to check if user logged in for /user path
/* app.use("/user", (request, response, next) => {
  //get user from session and go to next middleware function
  if (request.session.loggedIn) {
    app.locals.user = request.session.user;
    next();
  } else {
     response.redirect("/login");
  }
}); */
/* app.use("/logout", (request, response, next) => {
  //reset local variable "user"
  app.locals.user = null;
  next();
}); */

//USE PAGE ROUTES FROM ROUTER(S)
app.use("/", router);
app.use("/", userRouter);
/* 
app.get("/add", async (request, response) => {
  //add a pet
  await db.addPet("Max", "dog", "Great Dane", 7)
  response.redirect("/");
});
app.get("/update", async (request, response) => {
  //update something
  await db.updatePetName("Max", "Maximillian")
  response.redirect("/");
});
app.get("/delete", async (request, response) => {
  await db.deletePetByName("Fred");
  response.redirect("/");
}) */

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

