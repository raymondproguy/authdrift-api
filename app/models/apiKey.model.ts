// ./app/models/apiKey.model.ts

import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  devId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dev',
    required: true
  },
  name: {
    type: String,
    trim: true,
    maxlength: [50, "Key name cannot exceed 50 characters"]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsed: {
    type: Date,
    default: null
  },
  expiresAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Index for faster lookups
apiKeySchema.index({ key: 1 });
apiKeySchema.index({ devId: 1, isActive: 1 });

// Logging middleware
apiKeySchema.post('save', function(doc) {
  logger.debug(`API key saved for dev: ${doc.devId}`);
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);
export default ApiKey;
