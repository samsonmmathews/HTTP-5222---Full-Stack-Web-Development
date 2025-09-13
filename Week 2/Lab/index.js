import express, { response } from "express";
import path from "path";
const __dirname = import.meta.dirname;

const app = express(); //create Express app
const port = process.env.PORT || "8888";

app.set("views");
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
    response.render("index", { title: "Home" })
});
app.get("/about", (request, response) => {
    response.render("about", { title: "About" })
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});