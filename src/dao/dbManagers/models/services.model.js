import mongoose from 'mongoose';

const servicesCollection = 'services';

const servicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    service_datetime: {
        type: String,
        required: true
    }
});

export const servicesModel = mongoose.model(servicesCollection, servicesSchema);
