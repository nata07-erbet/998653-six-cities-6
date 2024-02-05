import { Schema, Document, model } from 'mongoose';
import { TOffer, CityType, FlatType, User  } from '../../../types/index.js';

export interface OfferDocument extends TOffer, Document {
  createdAt: Date,
  updatedAt: Date,
}

const offerSchema = new Schema({
  name: {
   type: String,
  },
  desription: {
    type: String,
  },
  date: {
    type: Date,
  },
  city: {
    type: String,
    enum: CityType
  },
  prevImg: {
    type: String,
  },
  photos: {
    type: Array,
  },
  isPremium: {
    type: Boolean
  },
  isFavorite: {
    type: Boolean
  },
  rating: {
    type: Number
  },
  flat: {
    type: String,
    enum: FlatType
  },
  inside: {
    type: Array,
  },
  rooms: {
    type: Number
  },
  adult: {
    type: Number
  },
  price: {
    type: Number
  },
  user: {
    type: Object,
  },
  comment: {
    type: Number
  },
  coords: {
    type: Object
  }
});