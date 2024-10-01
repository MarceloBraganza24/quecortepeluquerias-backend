import mongoose from 'mongoose';

const companiesCollection = 'companies';

const companiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company_datetime: {
        type: String,
        required: true
    }
});

export const companiesModel = mongoose.model(companiesCollection, companiesSchema);
