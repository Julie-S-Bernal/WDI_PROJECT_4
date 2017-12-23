const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    image: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("image", imageSchema);
