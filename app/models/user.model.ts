// ./app/models/user.model.ts

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength:[20, "Name must not excced 20 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    logger.debug(`Password hashed for user: ${this.username}`);
    next();
  } catch (error: any) {
    logger.error(`Password hashing error: ${error.message}`);
    next(error);
  }
});

// Logging middleware
userSchema.post('save', function(doc) {
  logger.debug(`User saved: ${doc.username}`);
});

const User = mongoose.model('User', userSchema);
export default User;
