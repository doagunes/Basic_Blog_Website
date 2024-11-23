import express, { text } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const texts = [];
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req,res) => {
  res.render("index.ejs", { textArray: texts });
  });
  
  app.get("/about", (req,res) => {
    res.render("about.ejs");
  });
  
  app.get("/addText", (req,res) => {
    res.render("addText.ejs");
  });

  app.post("/submit", (req,res) =>{
    const text = req.body["yourText"];
    texts.push(text);
    res.redirect("/");   
    
  } );

  app.get("/update", (req, res) => {
    const index = req.query.updateIndex;
    const text = texts[index];
    res.render("updateText.ejs", {
        index : index,
        oldText: text,
    });
});

  app.post("/updateText", (req,res) =>{
    const index = parseInt(req.body["updateIndex"]);
    const text = req.body["newText"];
    texts.splice(index, 1, text);
    res.redirect("/"); 
  } );

  app.post("/delete", (req,res) =>{
    const index = parseInt(req.body["deleteIndex"]);
    texts.splice(index,1);
    res.redirect("/");   
  } );

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });