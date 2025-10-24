// Import dependencies
import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        set: v =>
      v
        .trim()                           // remove leading/trailing spaces
        .replace(/\s+/g, ' ')             // collapse multiple spaces
        .split(' ')                       // split into words
        .map(
          word =>
            word.charAt(0).toUpperCase() + // capitalize first letter
            word.slice(1).toLowerCase()    // lowercase the rest
        )
        .join(' ')                        // join back together
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
      type: String,
      default: "",
    },
}, {
    timestamps: true
});

// Create the user model
const User = mongoose.model('User', userSchema);

// Export the user model
export default User;