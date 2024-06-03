const dotenv = require('dotenv')
    dotenv.config();
const express = require("express");
const mongoose = require('mongoose');
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  const food = require('./models/food.js');
  

  //<-------------------  Middleware ----------------------->

  app.use(express.urlencoded({ extended: false }));
  app.use(methodOverride("_method")); // new
  app.use(morgan("dev")); //new
  
//<----------------------- Get - routes --------------------------------->


app.get('/', async (req, res)=> {
    res.render("index.ejs");
});


// GET /food
app.get("/food", async (req, res) => {
    const allFoods = await food.find();
    // console.log(allFood)
    res.render('food/index.ejs', { foods: allFoods });
  });

app.get('/food/newCategory', (req, res) => {
    res.render('food/newCategory.ejs');
})

app.get('/food/new', (req, res) => {
    res.render('food/new.ejs');
})


    
    
// POST /food
app.post("/food", async (req, res) => {
    if (req.body.isBest === "on") {
      req.body.isBest = true;
    } else {
      req.body.isBest = false;
    }
    await food.create(req.body);

    res.redirect("/food");
  });


  app.get("/food/:food", async (req, res) => {
    const foundFood = await food.find(req.params.category);
    res.render('food/show.ejs', { food: foundFood });
  });

  app.get('/food/:foodId/edit', async(req, res) => {
    const foundFood = await food.findById(req.params.foodId)
    console.log(foundFood);
    res.render("food/edit.ejs", {
        food: foundFood,    
  })
  })


//<--------------------- Edit / Delete - Route ------------------------->

app.put("/food/:foodId", async (req, res) => {
    if (req.body.isBest === "on") {
      req.body.isBestt = true;
    } else {
      req.body.isBest = false;
    }
    await food.findAndUpdate(req.params.category, req.body);

    res.redirect(`/food/${req.params.category}`);
  });


  app.delete("/food/:foodId", async (req, res) => {
    await food.findByIdAndDelete(req.params.category);
    res.redirect('/food');
  });
  

  

//<--------------------- Listening - Route --------------------------->
app.listen(3000, () => {
  console.log("Listening on port 3000");
});