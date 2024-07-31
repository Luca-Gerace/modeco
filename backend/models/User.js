import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  password: { type: String },
  googleId: { type: String },
  ecoPoints: { type: Number, default: 0 },
  role: { 
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  }
}, {
  timestamps: true,
  collection: "users"
});

// Compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hashing password before save action
userSchema.pre('save', async function(next) {

  // Check - Only if the password is new/modified 
  if (!this.isModified('password')) return next();

  try {
    // Get random value with 10 round of hashing
    const salt = await bcrypt.genSalt(10);

    // Save password on MongoDB
    this.password = await bcrypt.hash(this.password, salt);

    next();

  } catch (err) {
    next(err);
  }
})

export default mongoose.model("User", userSchema);
