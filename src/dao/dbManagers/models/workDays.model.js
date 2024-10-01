import mongoose from 'mongoose';

const workDaysCollection = 'workDays';

const workDaysSchema = new mongoose.Schema({
    hairdresser: {
        type: String,
        required: true
    },
    work_day: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    workDay_datetime: {
        type: String,
        required: true
    }
});

export const workDaysModel = mongoose.model(workDaysCollection, workDaysSchema);
