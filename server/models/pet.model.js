const mongoose = require("mongoose");
const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must have at least 3 characters"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      minlength: [3, "Type must have at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [3, "Description must have at least 3 characters"],
    },
    firstSkill: {
      type: String,
    },
    secondSkill: {
      type: String,
    },
    thirdSkill: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
