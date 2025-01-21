import express from "express";
import handelbars from "express-handlebars";

const app = express();

//set the view engine to handlebars
app.engine("hbs", handelbars.engine({
    extname: "hbs"
}));

app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use('/static', express.static("src/public"));

app.get("/", (req, res) => {
    res.render("home", { layout: false });
});

app.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
});