const Pet = require("../models/pet.model");

module.exports = {
  createPet: (request, response) => {
    const newPet = request.body;
    Pet.exists({ name: newPet.name })
      .then((petExists) => {
        if (petExists) {
          return Promise.reject({
            errors: { name: { message: "Name must be unique" } },
          });
        }
        return Pet.create(newPet);
      })
      .then((pet) => response.json(pet))
      .catch((err) => {
        console.log(err);
        response.status(400).json(err);
      });
  },

  getAllPets: (request, response) => {
    Pet.find({})
      .sort({ type: "asc" })
      .then((pets) => {
        console.log(pets);
        response.json(pets);
      })
      .catch((err) => {
        console.log(err);
        response.json(err);
      });
  },

  getOnePet: (request, response) => {
    Pet.findOne({ _id: request.params.id })
      .then((pet) => {
        console.log(pet);
        response.json(pet);
      })
      .catch((err) => {
        console.log(err);
        response.json(err);
      });
  },

  deletePet: (request, response) => {
    Pet.deleteOne({ _id: request.params.id })
      .then((deletePet) => response.json(deletePet))
      .catch((err) => response.json(err));
  },

  updatePet: (request, response) => {
    Pet.findOneAndUpdate({ _id: request.params.id }, request.body, {
      new: true,
      runValidators: true,
      context: "query",
    })
      .then((updatedPet) => response.json(updatedPet))
      .catch((err) => response.status(400).json(err));
  },
  
  addLike: (request, response) => {
    Pet.findOneAndUpdate(
      { _id: request.params.id },
      { $inc: { likes: 1 } },
      { new: true }
    )
      .then((updatedPet) => response.json(updatedPet))
      .catch((err) => response.status(400).json(err));
  },
};
