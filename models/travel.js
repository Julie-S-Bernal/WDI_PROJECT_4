const mongoose = require("mongoose");

const travelSchema = mongoose.Schema(
  {
    // budget: { type: Number, required: true },
    startTravelDate: { type: String },
    endTravelDate: { type: String },
    country: {
      name: String,
      image: String
    },
    currency: { type: String, required: "Please provide a currency type" },
    hotelCost: { type: Number, required: "Please provide hotel price" },
    foodCost: { type: Number, required: "Please provide budget for food cost" },
    foodCostValues: { type: Array, default: [] },
    extra: { type: Number, required: "Please provide budget for extra cost" },
    extraCostValues: { type: Array, default: [] },
    travelCost: {
      type: Number,
      required: "Please provide your budget for taxi,bus,train fare"
    },
    transportation: {
      type: Number,
      required: "Please provide your plane fare"
    },
    transportationCostValues: { type: Array, default: [] },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

travelSchema.pre("save", function(next) {
  this.foodCostValues.push(this.foodCost);
  this.extraCostValues.push(this.extra);
  this.transportationCostValues.push(this.transportation);
  next();
});

module.exports = mongoose.model("Travel", travelSchema);
