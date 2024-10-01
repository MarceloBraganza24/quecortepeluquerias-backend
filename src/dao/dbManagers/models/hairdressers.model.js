import mongoose from 'mongoose';

const hairdressersCollection = 'hairdressers';

const hairdressersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hairdresser_datetime: {
        type: String,
        required: true
    }
});

export const hairdressersModel = mongoose.model(hairdressersCollection, hairdressersSchema);
