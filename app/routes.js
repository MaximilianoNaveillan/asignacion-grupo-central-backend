const fetch = require("node-fetch");
const fs = require("fs");

// RETONA COLECCION COMPLETA

module.exports = function (app) {
  app.get("/api", (req, res) => {
    fs.readFile("./collection.json", "utf8", (error, collection) => {
      const data = JSON.parse(collection);
      if (error) {
        console.log(error);
        return;
      }

      res.json(data);
    });
  });

  // RETORNA COLLECION POR CAUSA

  app.get("/api/bycause/cause:cause", (req, res) => {
    fs.readFile("./collection.json", "utf8", (error, collection) => {
      const data = JSON.parse(collection);
      if (error) {
        console.log(error);
        return;
      }
      let rows = [];
      const cause = req.params.cause.replace(/ /g, "_");
      const arr = data.rows;
      for (let i = 0; i < arr.length; i++) {
        const obj = {
          jurisdiction_of_occurrence: arr[i].jurisdiction_of_occurrence,
          year: arr[i].year,
          mont: arr[i].month,
        };
        obj[cause] = arr[i][cause];
        rows.push(obj);
      }
      data.rows = rows;

      data.cols = ["jurisdiction_of_occurrence", "year", "month", cause];
      res.json(data);
    });
  });
};
