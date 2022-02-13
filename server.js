const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");

const app = express();

// middlewares
app.use(express.json());

// routes
require("./app/routes")(app);

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
  initDb();
});

// FECH DE LA API "https://data.cdc.gov/resource/bxq8-mugm.json"
// LA COLECCION OBTENIDO SE ALMACENA EN "./collection.json"

function initDb() {
  fetch("https://data.cdc.gov/resource/bxq8-mugm.json")
    .then((promesaFetch) => promesaFetch.json())
    .then((rows) => {
      var tags = Object.keys(rows[0]);
      const cols = [];
      const list = tags.map((item, i) => {
        cols.push(item.replace(/_/g, " "));
        return {
          name: item.replace(/_/g, " "),
          favorite: false,
          _id: i,
          selected: false,
        };
      });
      const data = JSON.stringify({ list: list.slice(3), rows, cols });
      fs.writeFile("collection.json", data, (err) => {
        if (err) console.log("error la crear la colección");
        else {
          console.log("la colección fue creada correctamente");
        }
      });
    });
}
