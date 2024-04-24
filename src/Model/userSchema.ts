import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  password: {
    type: String,
    // required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactMode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
