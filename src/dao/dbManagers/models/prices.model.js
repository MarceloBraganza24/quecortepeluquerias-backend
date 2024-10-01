import mongoose from 'mongoose';

const pricesCollection = 'prices';

const pricesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    price_datetime: {
        type: String,
        required: true
    }
});

export const pricesModel = mongoose.model(pricesCollection, pricesSchema);
