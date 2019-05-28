import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ThingSchema = new Schema({
    _id: { 
        itemId: { type: String, required: true },
        userId: { type: String, required: true },
    },
    userId: { type: String, required: true },
    link: { type: String, required: true },
    pictureUrl: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true }
});

const Thing = mongoose.model('Thing', ThingSchema);