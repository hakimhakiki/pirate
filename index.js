
// import express js lib
const express = require("express");
const crew = require("./crew");

const app = express();

// make urlencode for json
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));

// baca data tabel crew
app.get("/crew", crew.getcrew);

// tambah data tabel crew
app.post("/crew/add", crew.addcrew);

// update data crew
app.put("/crew/update/:id", crew.updatecrew);

// delete data crew by id
app.delete("/crew/delete/:id", crew.deletecrew);

// make local server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
