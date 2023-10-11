const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/pet-shelter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established a connection to the database"))
  .catch((err) =>
    console.log("Something went wrong when connecting to the database", err)
  );
