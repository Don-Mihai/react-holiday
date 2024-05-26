import mongoose, { Schema } from 'mongoose';

export const userScheme = new Schema(
  {
    id: Number,
    password: String,
    email: String,
  },
  {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model('User', userScheme);
export default User; // Export the schema
