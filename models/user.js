const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    homeCountry: { type: String, trim: true, required: true },
    homeCurrency: { type: String },
    salary: { type: Number, trim: true, required: true },
    monthlySalary: { type: Number, trim: true, required: true },
    livingExpensesYear: { type: Number, trim: true, required: true },
    livingExpensesMonth: { type: Number, trim: true, required: true },
    currentToken: { type: String, trim: true, required: false }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("travels", {
  ref: "Travel",
  localField: "_id",
  foreignField: "createdBy"
});

userSchema
  .virtual("passwordConfirmation")
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre("validate", function checkPassword(next) {
  if (
    !this._passwordConfirmation ||
    this._passwordConfirmation !== this.password
  ) {
    this.invalidate("passwordConfirmation", "Passwords do not match");
  }
  next();
});

userSchema.pre("save", function hashPassword(next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
