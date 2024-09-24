const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Job", jobSchema);
