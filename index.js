const express = require("express");
    const app = express();
    const bodyParser = require('body-parser');
    const path = require("path");
    const fs = require("fs");

  //constants
  const DB_PATH = path.resolve("db.json");
  const PORT = process.env.PORT || 8000;
  //middlewares
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // routes
  app.get("/", async (req, res) => {
    fs.readFile(DB_PATH ,"utf-8", (err, jsonString) => {
      if (err) return console.log(err);
      let values = JSON.parse(jsonString);
      res.status(200).json({
        totalValues: values.length,
        values,
      });
    });
    app.get("/testtt", (req, res) => { 
      console.log("hello world");
    })
    
  });
  app.post("/", async (req, res) => {
    fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
      if (err) return console.log("Error in reading from db");
      let body = req.body;
      let valuesArr = JSON.parse(jsonString);
      let obj = {
        temperature: body,
        humidity: body,
        timestamp: new Date(),
      };
      valuesArr.push(obj);
      fs.writeFile(DB_PATH, JSON.stringify(valuesArr), (err) => {
        if (err) return console.log("Error in updating db");
        res.status(200).json({
          message: "Values saved",
          value: valuesArr[valuesArr.length - 1],
        });
      });
    });
  });
  app.post('/test', (req, res) => {
    const { data } = req.body;
    console.log(`data: ${data}`);
    res.send('success');
  });
  app.post('/tt', (req, res) => {
    
    console.log('data');
    
  });
  app.listen(PORT, () => console.log("Listening on port", PORT));
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/test', (req, res) => {
//   const { data } = req.body;
//   console.log(`data: ${data}`);
//   res.send('success');
// });

// app.post('/', (req, res) => {
//     console.log('test')
// })

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });