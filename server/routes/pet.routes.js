const PetController = require("../controllers/pet.controller");

module.exports = (app) => {
  app.post("/api/pets", PetController.createPet);
  app.get("/api/pets", PetController.getAllPets);
  app.get("/api/pets/:id", PetController.getOnePet);
  app.delete("/api/pets/:id", PetController.deletePet);
  app.patch("/api/pets/:id", PetController.updatePet);
  app.post("/api/pets/:id/addLike", PetController.addLike);
};
